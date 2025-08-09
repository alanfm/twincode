<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreParticipantRequest;
use App\Http\Requests\StoreQuestionnairesComparisonRequest;
use App\Models\Answer;
use App\Models\Comparison;
use App\Models\Participant;
use App\Models\Question;
use App\Models\Research;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class DataCollectionController extends Controller
{
    /**
     * Display the data collection index page.
     *
     * @param Request $request
     * @param string $key
     * @return Response
     */
    public function index(Request $request, string $key): Response
    {
        $research = $this->ensureResearchActive($key);

        return Inertia::render('DataCollection/Index', [
            'research' => $research,
            'formData' => Session::get('data', []),
        ]);
    }

    /**
     * Accept the research participation.
     *
     * @param Request $request
     * @param string $key
     * @return RedirectResponse
     */
    public function accepted(Request $request, string $key): RedirectResponse
    {
        Session::put('research_accepted', true);

        Session::put('data', array_merge($request->all(), Session::get('data', [])));

        return Redirect::route('public.research.participant', [
            'key' => $key
        ]);
    }

    /**
     * Display the research participant page.
     *
     * @param Request $request
     * @param string $key
     * @return Response
     */
    public function participant(Request $request, string $key): Response
    {
        $research = Research::getByKey($key)->load(['questionnaires' => function ($quety) {
            $quety->with(['questions' => function ($query) {
                $query->with(['options']);
            }])->where('position', 'initial');
        }]);

        $this->ensureResearchAccess($key, $research);

        return Inertia::render('DataCollection/Participant', [
            'research' => $research->load(['comparisons']),
            'formData' => Session::get('data', []),
        ]);
    }

    /**
     * Store the research participant data.
     *
     * @param StoreParticipantRequest $request
     * @param string $key
     * @return RedirectResponse
     */
    public function storeParticipant(StoreParticipantRequest $request, string $key): RedirectResponse
    {
        $this->ensureResearchAccess($key);

        Session::put('data', [...Session::get('data', []), ...$request->all()]);

        return Redirect::route('public.research.comparison', ['key' => $key, 'page' => $request->page ?? 1]);
    }

    /**
     * Display the research comparison page.
     *
     * @param Request $request
     * @param string $key
     * @return Response
     */
    public function comparison(Request $request, string $key): Response
    {
        $research = $this->ensureResearchAccess($key);

        $comparison = Comparison::where(function ($query) use ($research) {
            $query->where('research_id', $research->id);
        })->with(['questionnaires' => ['questions' => ['options']]])->paginate(1);

        if (!Session::has('lastPage')) {
            Session::put('lastPage', $comparison->lastPage());
        }

        return Inertia::render('DataCollection/Comparison', [
            'research' => $research,
            'comparison' => $comparison,
            'formData' => Session::get('data', []),
            'page' => $request->page ?? 1,
        ]);
    }

    /**
     * Store the research comparison data.
     *
     * @param StoreQuestionnairesComparisonRequest $request
     * @param string $key
     * @return RedirectResponse
     */
    public function storeComparison(StoreQuestionnairesComparisonRequest $request, string $key): RedirectResponse
    {
        $this->ensureResearchAccess($key);

        Session::put('data', [...Session::get('data', []), ...$request->all()]);

        return Redirect::route('public.research.comparison', ['key' => $key, 'page' => $request->page ?? 1]);
    }

    /**
     * Display the research conclusion page.
     *
     * @param Request $request
     * @param string $key
     * @return Response
     */
    public function conclusion(Request $request, string $key): Response
    {
        $research = Research::getByKey($key)->load(['questionnaires' => function ($quety) {
            $quety->with(['questions' => function ($query) {
                $query->with(['options']);
            }])->where('position', 'final');
        }]);

        $research = $this->ensureResearchAccess($key, $research);

        return Inertia::render('DataCollection/Conclusion', [
            'research' => $research->load(['comparisons']),
            'formData' => Session::get('data', []),
            'lastPage' => Session::get('lastPage', 1),
        ]);
    }

    /**
     * Store the research data.
     *
     * @param Request $request
     * @param string $key
     * @return RedirectResponse
     */
    public function store(Request $request, string $key): RedirectResponse
    {
        $research = $this->ensureResearchAccess($key);

        $data = $this->mergeRequestWithSessionData($request);

        try {
            DB::transaction(function () use ($research, $data) {
                $this->validateParticipantNotExists($research, $data['email']);
                $participant = $this->createParticipant($research, $data);
                $this->storeAnswers($participant, $data['answers']);
            });
        } catch (Exception $e) {
            return $this->redirectWithError($key, $e->getMessage());
        }

        $this->clearResearchSession();

        return $this->redirectWithSuccess($key);
    }


    /**
     * Ensure that the user has accepted the research before proceeding.
     *
     * @param string $key
     * @return null|RedirectResponse
     */
    private function ensureResearchAccess(String $key, ?Research $research = null): RedirectResponse|Research
    {
        $research = $this->ensureResearchActive($key, $research);

        if (!Session::has('research_accepted')) {
            return Redirect::route('research.index', ['key' => $key]);
        }

        return $research;
    }

    /**
     * Ensure that the user has access to the research.
     *
     * @param string $key
     * @param Research|null $research
     * @return RedirectResponse|Research
     */
    private function ensureResearchActive(string $key, ?Research $research = null): RedirectResponse|Research
    {
        if (is_null($research)) {
            $research = Research::getByKey($key);
        }

        if (false === $research->isActive()) {
            abort(404);
        }

        return $research;
    }

    /**
     * Merge the request data with the session data.
     *
     * @param Request $request
     * @return array
     */
    private function mergeRequestWithSessionData(Request $request): array
    {
        Session::put('data', [...Session::get('data', []), ...$request->all()]);
        return [...Session::get('data', []), ...$request->all()];
    }

    /**
     * Validate that the participant does not already exist.
     *
     * @param Research $research
     * @param string $email
     * @throws ValidationException
     */
    private function validateParticipantNotExists($research, string $email): void
    {
        if (Participant::where('email', $email)->where('research_id', $research->id)->exists()) {
            throw ValidationException::withMessages([
                'email' => 'Você já participou desta pesquisa com este e-mail.'
            ]);
        }
    }

    /**
     * Create a new participant for the research.
     *
     * @param Research $research
     * @param array $data
     * @return Participant
     */
    private function createParticipant($research, array $data): Participant
    {
        return Participant::create([
            'research_id' => $research->id,
            'name' => $data['name'],
            'email' => $data['email'],
        ]);
    }

    /**
     * Store the participant's answers.
     *
     * @param Participant $participant
     * @param array $answers
     */
    private function storeAnswers(Participant $participant, array $answers): void
    {
        foreach ($answers as $questionId => $answer) {
            if (is_array($answer) || ctype_digit($answer)) {
                $participant->options()->attach($answer);
                continue;
            }

            if (is_string($answer)) {
                $question = Question::find($questionId);
                if ($question->type === 'text') {
                    Answer::create([
                        'participant_id' => $participant->id,
                        'question_id' => $questionId,
                        'answer' => $answer,
                    ]);
                }
            }
        }
    }

    /**
     * Redirect with an error message.
     *
     * @param string $key
     * @param string|null $message
     * @return RedirectResponse
     */
    private function redirectWithError(string $key, string $message): RedirectResponse
    {
        return Redirect::route('public.research.index', ['key' => $key])->with('alert', [
            'type' => 'error',
            'message' => $message ?? 'Ocorreu um erro ao salvar os dados. Por favor, tente novamente.'
        ]);
    }

    /**
     * Redirect with a success message.
     *
     * @param string $key
     * @return RedirectResponse
     */
    private function redirectWithSuccess(string $key): RedirectResponse
    {
        return Redirect::route('public.research.index', ['key' => $key])->with('alert', [
            'type' => 'success',
            'message' => 'Dados salvos com sucesso! Obrigado por participar da pesquisa!'
        ]);
    }

    /**
     * Clear the research session data.
     *
     * @return void
     */
    private function clearResearchSession(): void
    {
        Session::forget('data');
        Session::forget('research_accepted');
        Session::forget('lastPage');
        Session::regenerate();
    }
}
