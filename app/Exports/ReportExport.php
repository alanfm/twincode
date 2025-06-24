<?php
namespace App\Exports;

use App\Models\Comparison;
use App\Models\Participant;
use App\Models\Question;
use App\Models\Questionnaire;
use App\Models\Research;
use Vitorccs\LaravelCsv\Concerns\Exportables\FromArray;
use Vitorccs\LaravelCsv\Concerns\Exportables\Exportable;

class ReportExport  implements FromArray
{
    use Exportable;

    private $research;

    public function __construct($research)
    {
        $this->research = $research;
    }

    public function array(): array
    {
        $questions = ['Nome' => [], 'E-mail' => []];

        $questionnaires = Questionnaire::where('respondable_id', $this->research->id)
            ->where('respondable_type', Research::class)
            ->get()
            ->each(function ($questionnaire) {
                $questionnaire->load(['questions']);
            });

        $questionnaires->each(function ($q) use (&$questions) {
            $q->questions->each(function ($question) use (&$questions) {
                $questions[$question->id] = [];
            });
        });

        $comparisonQuestionnaires = Comparison::where('research_id', $this->research->id)
            ->get()
            ->each(function ($comparison) {
                $comparison->load(['questionnaires' => ['questions']]);
            });

        $comparisonQuestionnaires->each(function ($comparison) use (&$questions) {
            $comparison->questionnaires->each(function ($questionnaire) use (&$questions, &$comparison) {
                $questionnaire->questions->each(function ($question) use (&$questions, &$comparison) {
                    $questions[$question->id] = [];
                });
            });
        });
        // krsort($questions);
        $p = [];

        $participants = Participant::where('research_id', $this->research->id)
            ->get()
            ->each(function ($participant) {
                $participant->load(['answers' => ['question'], 'options' => ['question']]);
            });

        $participants->each(function ($participant) use (&$questions, &$p) {
            $participant->answers->map(function ($answer) use (&$questions, &$p) {
                if (isset($questions[$answer->question->id])) {
                    // Se a questão já existe, adiciona a resposta ao array
                    $questions[$answer->question->id][] = $answer->answer;
                    $p[$answer->question->id] = $answer->answer;
                }
                return;
            })->toArray();
            $q = [];
            $participant->options->map(function ($option) use (&$q) {
                if (isset($q[$option->question->id])) {
                    // Se já existe, adiciona a descrição da opção ao valor existente
                    $q[$option->question->id] .= ', ' . $option->description;
                } else {
                    // Se não existe, adiciona a opção como uma nova entrada
                    $q[$option->question->id] = $option->description;
                }
            })->toArray();
            foreach ($q as $key => $value) {
                if (isset($questions[$key])) {
                    // Se a questão já existe, adiciona a opção ao array
                    $questions[$key][] = $value;
                }
            }
            $questions['Nome'][] = $participant->name;
            $questions['E-mail'][] = $participant->email;
        });

        $keys = array_keys($questions);
        // transforma o array para se adequar ao formato do CSV
        $questions = array_values($questions);
        $answers = [];
        //transformar cada linha em uma string
        foreach ($questions as $question) {
            foreach ($question as $key => $value) {
                $answers[$key] = isset($answers[$key]) ? $answers[$key] . '|' . $value : $value;
            }
        }
        $header = [];
        foreach ($keys as $value) {
            if (is_numeric($value)) {
                $header[] = Question::find($value)->statement;
                continue;
            }
            $header[] = $value;
        }
        $header = implode('| ', $header);

        return [$header, ...$answers];
    }

    public function export()
    {
        return;
    }
}
