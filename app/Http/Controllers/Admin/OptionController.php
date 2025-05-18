<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOptionRequest;
use App\Http\Requests\UpdateOptionRequest;
use App\Models\Option;
use App\Models\Question;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;

class OptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOptionRequest $request, Question $question)
    {
        try {
            $question->options()->create($request->validated());
            return Redirect::route('questionnaires.questions.show', [$question->questionnaire, $question])->with('alert', [
                'type' => 'success',
                'message' => 'Registro criado com sucesso',
            ]);
        } catch (Exception $e) {
            Log::error('Erro ao criar registro: ' . $e->getMessage());
            return Redirect::route('questionnaires.questions.show', [$question->questionnaire, $question])->with('alert', [
                'type' => 'error',
                'message' => 'Erro ao criar registro: ' . $e->getMessage(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Option $option)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Option $option)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOptionRequest $request, Option $option)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Question $question, Option $option)
    {
        try {
            $option->delete();
            return Redirect::route('questionnaires.questions.show', [$question->questionnaire, $question])->with('alert', [
                'type' => 'success',
                'message' => 'Registro deletado com sucesso',
            ]);
        } catch (Exception $e) {
            Log::error('Erro ao deletar registro: ' . $e->getMessage());
            return Redirect::route('questionnaires.questions.show', [$question->questionnaire, $question])->with('alert', [
                'type' => 'error',
                'message' => 'Erro ao deletar registro: ' . $e->getMessage(),
            ]);
        }
    }
}
