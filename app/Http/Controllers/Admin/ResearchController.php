<?php

namespace App\Http\Controllers\Admin;

use App\Exports\ReportExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreResearchRequest;
use App\Http\Requests\UpdateResearchRequest;
use App\Models\Comparison;
use App\Models\Participant;
use App\Models\Questionnaire;
use App\Models\Research;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

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
    public function show(Research $research)
    {
        return Inertia::render('Admin/Research/Show', [
            'research' => $research->load(['user']),
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

    public function report(Request $request, Research $research)
    {
        return Inertia::render('Admin/Research/Report', array_merge(Participant::search(request: $request, research: $research), [
            'research' => $research,
        ]));
    }

    public function reportShow(Request $request, Research $research, Participant $participant)
    {
        $participant->load(['answers', 'questionnaire', 'comparisons']);
        $questionnaire = Questionnaire::find($participant->questionnaire_id);
        $comparisons = Comparison::where('participant_id', $participant->id)->get();

        return Inertia::render('Admin/Research/ReportShow', [
            'research' => $research,
            'participant' => $participant,
            'questionnaire' => $questionnaire,
            'comparisons' => $comparisons,
        ]);
    }

    public function reportDownload(Request $request, Research $research)
    {
        $export = new ReportExport($research);
        $fileName = 'report-' . $research->id . '-' . now()->format('Y-m-d-H-i-s') . '.csv';
        $path = 'app/public/' . $fileName;
        $header = $export->array()[0];

        $csvFile = fopen(storage_path($path), 'w');
        // Write the header row
        fputcsv($csvFile, explode('|', $header), '|');
        // Write each row of data
        foreach ($export->array() as $key => $row) {
            if ($key === 0) continue; // Skip header row
            fputcsv($csvFile, explode('|', $row), '|');
        }
        fclose($csvFile);

        return response()->download(storage_path($path), $fileName, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . basename($path) . '"',
        ])->deleteFileAfterSend(true);
    }
}
