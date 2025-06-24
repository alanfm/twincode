<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreParticipantRequest;
use App\Http\Requests\StoreQuestionnairesComparisonRequest;
use App\Models\Answer;
use App\Models\Comparison;
use App\Models\Participant;
use App\Models\Question;
use App\Models\Research;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class DataCollectionController extends Controller
{
    public function index(Request $request, string $key)
    {
        $research = Research::getByKey($key);

        if (!$research->isActive()) {
            abort(404);
        }

        return Inertia::render('DataCollection/Index', [
            'research' => $research,
            'formData' => Session::get('data', []),
        ]);
    }

    public function accepted(Request $request, string $key)
    {
        Session::put('research_accepted', true);

        Session::put('data', array_merge($request->all(), Session::get('data', [])));

        return Redirect::route('public.research.participant', [
            'key' => $key
        ]);
    }

    public function participant(Request $request, string $key)
    {
        $research = Research::getByKey($key)->load(['questionnaires' => function($quety) {
            $quety->with(['questions' => function($query) {
                $query->with(['options']);
            }])->where('position', 'initial');
        }]);

        if (!$research->isActive()) {
            abort(404);
        }

        if (!Session::has('research_accepted')) {
            return Redirect::route('research.index', ['key' => $key]);
        }

        return Inertia::render('DataCollection/Participant', [
            'research' => $research,
            'formData' => Session::get('data', []),
        ]);
    }

    public function storeParticipant(StoreParticipantRequest $request, string $key)
    {
        if (!Session::has('research_accepted')) {
            return Redirect::route('research.index', ['key' => $key]);
        }

        Session::put('data', [...Session::get('data', []), ...$request->all()]);

        return Redirect::route('public.research.comparison', ['key' => $key, 'page' => $request->page ?? 1]);
    }

    public function comparison(Request $request, string $key)
    {
        $research = Research::getByKey($key);

        if (!$research->isActive()) {
            abort(404);
        }

        if (!Session::has('research_accepted')) {
            return Redirect::route('public.research.index', ['key' => $key]);
        }

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

    public function storeComparison(StoreQuestionnairesComparisonRequest $request, string $key)
    {
        if (!Session::has('research_accepted')) {
            return Redirect::route('research.index', ['key' => $key]);
        }

        Session::put('data', [...Session::get('data', []), ...$request->all()]);

        return Redirect::route('public.research.comparison', ['key' => $key, 'page' => $request->page ?? 1]);
    }

    public function conclusion(Request $request, string $key)
    {
        $research = Research::getByKey($key)->load(['questionnaires' => function($quety) {
            $quety->with(['questions' => function($query) {
                $query->with(['options']);
            }])->where('position', 'final');
        }]);

        if (!$research->isActive()) {
            abort(404);
        }

        if (!Session::has('research_accepted')) {
            return Redirect::route('research.index', ['key' => $key]);
        }

        return Inertia::render('DataCollection/Conclusion', [
            'research' => $research,
            'formData' => Session::get('data', []),
            'lastPage' => Session::get('lastPage', 1),
        ]);
    }

    public function store(Request $request, string $key)
    {
        $research = Research::getByKey($key);

        if (!$research->isActive()) {
            abort(404);
        }

        if (!Session::has('research_accepted')) {
            return Redirect::route('research.index', ['key' => $key]);
        }

        $data = [...Session::get('data', []), ...$request->all()];

        DB::transaction(function () use ($research, $data) {
            $participant = Participant::create([
                'research_id' => $research->id,
                'name' => $data['name'],
                'email' => $data['email'],
            ]);

            foreach ($data['answers'] as $questionId => $answer) {
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
                        continue;
                    }
                }
            }
        });

        Session::forget('data');
        Session::forget('research_accepted');
        Session::forget('lastPage');
        Session::regenerate();

        return Redirect::route('public.research.index', ['key' => $key])->with('alert', [
            'type' => 'success',
            'message' => 'Dados salvo com sucesso! Obrigado por participar da pesquisa!'
        ]);
    }
}
