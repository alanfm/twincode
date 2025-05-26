<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuestionnaireRequest;
use App\Http\Requests\UpdateQuestionnaireRequest;
use App\Models\Questionnaire;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class QuestionnaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, string $respondable, int $id)
    {
        $class = 'App\\Models\\' . ucfirst($respondable);

        if (!class_exists($class) || !is_int($id)) {
            abort(404);
        }

        $instance = (new $class)->findOrFail($id);

        if ($respondable == 'comparison')
            $instance->load('research');

        return Inertia::render('Admin/Questionnaire/Index', array_merge(Questionnaire::search($request), [
            'respondable' => $instance,
            'respondable_id' => $id,
            'respondable_type' => $respondable,
        ]));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request, string $respondable, int $id)
    {
        $class = 'App\\Models\\' . ucfirst($respondable);

        if (!class_exists($class) || !is_int($id)) {
            abort(404);
        }

        $instance = (new $class)->findOrFail($id);

        if ($respondable == 'comparison')
            $instance->load('research');

        return Inertia::render('Admin/Questionnaire/Create', [
            'respondable' => $instance,
            'respondable_id' => $id,
            'respondable_type' => $respondable,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuestionnaireRequest $request, string $respondable, int $id)
    {
        $class = 'App\\Models\\' . ucfirst($respondable);

        if (!class_exists($class) || !is_int($id)) {
            abort(404);
        }

        try {
            $questionnaire = (new $class)->findOrFail($id)->questionnaires()->create($request->validated());

            return Redirect::route('questionnaires.show', [
                'questionnaire' => $questionnaire,
                'respondable' => $respondable,
                'id' => $id,
            ])->with('alert', [
                'message' => 'Registro criado com sucesso.',
                'type' => 'success'
            ]);
        } catch (Exception $e) {
            Log::error('Erro ao criar o registro: ' . $e->getMessage());
            return Redirect::back()->with('alert', [
                'message' => 'Erro ao criar o registro.',
                'type' => 'error'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $respondable, int $id, Questionnaire $questionnaire)
    {
        $class = 'App\\Models\\' . ucfirst($respondable);

        if (!class_exists($class) || !is_int($id)) {
            abort(404);
        }

        $instance = (new $class)->findOrFail($id);

        if ($respondable == 'comparison')
            $instance->load('research');

        return Inertia::render('Admin/Questionnaire/Show', [
            'questionnaire' => $questionnaire->load('respondable'),
            'respondable' => $instance,
            'respondable_id' => $id,
            'respondable_type' => $respondable,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $respondable, int $id, Questionnaire $questionnaire)
    {
        $class = 'App\\Models\\' . ucfirst($respondable);

        if (!class_exists($class) || !is_int($id)) {
            abort(404);
        }

        $instance = (new $class)->findOrFail($id);

        if ($respondable === 'comparison')
            $instance->load('research');

        return Inertia::render('Admin/Questionnaire/Edit', [
            'questionnaire' => $questionnaire,
            'respondable' => $instance,
            'respondable_id' => $id,
            'respondable_type' => $respondable,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuestionnaireRequest $request, string $respondable, int $id, Questionnaire $questionnaire)
    {
        $class = 'App\\Models\\' . ucfirst($respondable);

        if (!class_exists($class) || !is_int($id)) {
            abort(404);
        }

        try {
            $questionnaire->update($request->validated());

            return Redirect::route('questionnaires.show', [
                'questionnaire' => $questionnaire,
                'respondable' => $respondable,
                'id' => $id,
            ])->with('alert', [
                'message' => 'Registro atualizado com sucesso.',
                'type' => 'success'
            ]);
        } catch (Exception $e) {
            Log::error('Erro ao atualizar o registro: ' . $e->getMessage());
            return Redirect::back()->with('alert', [
                'message' => 'Erro ao atualizar o registro.',
                'type' => 'error'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $respondable, int $id, Questionnaire $questionnaire)
    {
        $class = 'App\\Models\\' . ucfirst($respondable);

        if (!class_exists($class) || !is_int($id)) {
            abort(404);
        }

        try {
            $questionnaire->delete();

            return Redirect::route('questionnaires.index', [
                'respondable' => $respondable,
                'id' => $id,
            ])->with('alert', [
                'message' => 'Registro excluído com sucesso.',
                'type' => 'success'
            ]);
        } catch (Exception $e) {
            Log::error('Erro ao excluir o registro: ' . $e->getMessage());
            return Redirect::back()->with('alert', [
                'message' => 'Erro ao excluir o registro.',
                'type' => 'error'
            ]);
        }
    }
}
