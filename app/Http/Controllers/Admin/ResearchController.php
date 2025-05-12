<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreResearchRequest;
use App\Http\Requests\UpdateResearchRequest;
use App\Models\Research;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ResearchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Admin/Research/Index', Research::search($request));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return Inertia::render('Admin/Research/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreResearchRequest $request)
    {
        try {
            $research = Research::create($request->validated());

            return Redirect::route('research.show', $research)->with('alert', [
                'message' => 'Registro atualizado com sucesso.',
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
    public function show(Research $research)
    {
        return Inertia::render('Admin/Research/Show', [
            'research' => $research,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Research $research)
    {
        return Inertia::render('Admin/Research/Edit', [
            'research' => $research,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateResearchRequest $request, Research $research)
    {
        try {
            $research->update($request->validated());

            return Redirect::route('research.show', $research)->with('alert', [
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
    public function destroy(Request $request, Research $research)
    {
        try {
            $research->delete();

            return Redirect::route('research.index')->with('alert', [
                'message' => 'Registro apagado com sucesso.',
                'type' => 'success'
            ]);
        } catch (Exception $e) {
            Log::error('Erro ao apagar o registro: ' . $e->getMessage());
            return Redirect::back()->with('alert', [
                'message' => 'Erro ao apagar o registro.',
                'type' => 'error'
            ]);
        }
    }
}
