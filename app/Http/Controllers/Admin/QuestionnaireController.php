<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuestionnaireRequest;
use App\Http\Requests\UpdateQuestionnaireRequest;
use App\Models\Questionnaire;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionnaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $respondable, $id)
    {
        $class = 'App\\Models\\' . ucfirst($respondable);

        if (!class_exists($class)) {
            abort(404);
        }

        return Inertia::render('Admin/Questionnaire/Index', [
            'respondable' => $class::findOrFail($id),
            'respondable_type' => $respondable,
            'questionnaires' => $class::findOrFail($id)->questionnaires()->get(),
        ]);
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
    public function store(StoreQuestionnaireRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Questionnaire $questionnaire)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Questionnaire $questionnaire)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuestionnaireRequest $request, Questionnaire $questionnaire)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Questionnaire $questionnaire)
    {
        //
    }
}
