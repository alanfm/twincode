<?php

namespace App\Http\Controllers;

use App\Models\Comparison;
use App\Models\Research;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class DataCollectionController extends Controller
{
    public function index(Request $request, string $key)
    {
        return Inertia::render('DataCollection/Index', [
            'research' => Research::getByKey($key),
        ]);
    }

    public function accepted(Request $request, string $key)
    {
        Session::put('research_accepted', true);

        return Redirect::route('public.research.participant', ['key' => $key]);
    }

    public function participant(Request $request, string $key)
    {
        if (!Session::has('research_accepted')) {
            return Redirect::route('research.index', ['key' => $key]);
        }

        return Inertia::render('DataCollection/Participant', [
            'research' => Research::getByKey($key)->load(['questionnaire' => ['questions' => ['options']]]),
            'data' => $request->all()
        ]);
    }

    public function storeParticipant(Request $request, string $key)
    {
        if (!Session::has('research_accepted')) {
            return Redirect::route('research.index', ['key' => $key]);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            // 'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:questions,id',
            'answers.*.option_id' => 'nullable|exists:options,id',
            'answers.*.text' => 'required|string|max:255',
        ]);

        // Store the participant's answers

        return Redirect::route('public.research.comparison', ['key' => $key]);
    }

    public function comparison(Request $request, string $key)
    {
        if (!Session::has('research_accepted')) {
            return Redirect::route('research.index', ['key' => $key]);
        }

        $comparison = Comparison::where(function ($query) use ($key) {
            $query->where('research_id', Research::getByKey($key)->firstOrFail()->id);
        })->with(['questionnaires' => ['questions' => ['options']]])->paginate(1);

        return Inertia::render('DataCollection/Comparison', [
            'research' => Research::getByKey($key)->firstOrFail(),
            'comparison' => $comparison,
        ]);
    }

    public function conclusion(Request $request, string $key)
    {
        if (!Session::has('research_accepted')) {
            return Redirect::route('research.index', ['key' => $key]);
        }

        return Inertia::render('DataCollection/Conclusion', [
            'research' => Research::getByKey($key)->load(['questionnaire' => ['questions' => ['options']]]),
        ]);
    }
}
