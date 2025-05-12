<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreComparisonRequest;
use App\Http\Requests\UpdateComparisonRequest;
use App\Models\Comparison;
use App\Models\Research;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ComparisonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Research $research)
    {
        return Inertia::render('Admin/Comparison/Index', Comparison::search(request: $request, research: $research));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request, Research $research)
    {
        return Inertia::render('Admin/Comparison/Create', [
            'research' => $research
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreComparisonRequest $request, Research $research)
    {
        try {
            $comparison = $research->comparisons()->create($request->validated());

            return Redirect::route('research.comparison.show', [$research, $comparison])->with('alert', [
                'message' => 'Registro cadastrado com sucesso.',
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
    public function show(Research $research, Comparison $comparison)
    {
        return Inertia::render('Admin/Comparison/Show', [
            'comparison' => $comparison,
            'research' => $research
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Research $research, Comparison $comparison)
    {
        return Inertia::render('Admin/Comparison/Edit', [
            'comparison' => $comparison,
            'research' => $research
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateComparisonRequest $request, Research $research, Comparison $comparison)
    {
        try {
            $comparison->update($request->validated());

            return Redirect::route('research.comparison.show', [$research, $comparison])->with('alert', [
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
    public function destroy(Request $request, Research $research, Comparison $comparison)
    {
        try {
            $comparison->delete();

            return Redirect::route('research.comparison.index', $research)->with('alert', [
                'message' => 'Registro deletado com sucesso.',
                'type' => 'success'
            ]);
        } catch (Exception $e) {
            Log::error('Erro ao deletar o registro: ' . $e->getMessage());
            return Redirect::back()->with('alert', [
                'message' => 'Erro ao deletar o registro.',
                'type' => 'error'
            ]);
        }
    }
}
