<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuestionRequest;
use App\Http\Requests\UpdateQuestionRequest;
use App\Models\Question;
use App\Models\Questionnaire;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use PhpParser\Node\Stmt\TryCatch;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Questionnaire $questionnaire): Response
    {
        return Inertia::render('Admin/Question/Index', array_merge(Question::search($questionnaire, $request),[]));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Questionnaire $questionnaire): Response
    {
        return Inertia::render('Admin/Question/Create', [
            'questionnaire' => $questionnaire,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuestionRequest $request, Questionnaire $questionnaire)
    {
        try {
            $question = Question::create($request->validated());
            return Redirect::route('questionnaires.questions.index', [$questionnaire, $question])->with('alert', [
                'type' => 'success',
                'message' => 'Registro criado com sucesso',
            ]);
        } catch (Exception $e) {
            Log::error('Erro ao criar registro: ' . $e->getMessage());
            return Redirect::back()->with('alert', [
                'type' => 'error',
                'message' => 'Erro ao criar registro: ' . $e->getMessage(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Questionnaire $questionnaire, Question $question): Response
    {
        return Inertia::render('Admin/Question/Show', [
            'questionnaire' => $questionnaire,
            'question' => $question,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Questionnaire $questionnaire, Question $question): Response
    {
        return Inertia::render('Admin/Question/Edit', [
            'questionnaire' => $questionnaire,
            'question' => $question,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuestionRequest $request, Questionnaire $questionnaire, Question $question)
    {
        try {
            $question->update($request->validated());
            return Redirect::route('questionnaires.questions.index', [$questionnaire, $question])->with('alert', [
                'type' => 'success',
                'message' => 'Registro atualizado com sucesso',
            ]);
        } catch (Exception $e) {
            Log::error('Erro ao atualizar registro: ' . $e->getMessage());
            return Redirect::back()->with('alert', [
                'type' => 'error',
                'message' => 'Erro ao atualizar registro: ' . $e->getMessage(),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Questionnaire $questionnaire, Question $question)
    {
        try {
            $question->delete();
            return Redirect::route('questionnaires.questions.index', [$questionnaire])->with('alert', [
                'type' => 'success',
                'message' => 'Registro excluído com sucesso',
            ]);
        } catch (Exception $e) {
            Log::error('Erro ao excluir registro: ' . $e->getMessage());
            return Redirect::back()->with('alert', [
                'type' => 'error',
                'message' => 'Erro ao excluir registro: ' . $e->getMessage(),
            ]);
        }
    }
}
