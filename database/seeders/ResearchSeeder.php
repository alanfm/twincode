<?php

namespace Database\Seeders;

use App\Models\Comparison;
use App\Models\Option;
use App\Models\Question;
use App\Models\Questionnaire;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Research;

class ResearchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Research::factory(1)
            ->has(
                Comparison::factory(5)->state(function (array $attributes, Research $research) {
                    return [
                        'research_id' => $research->id,
                    ];
                })
            )
            ->has(Questionnaire::factory(1)
                ->state(function (array $attributes, Research $research) {
                    return [
                        'respondable_type' => Research::class,
                        'respondable_id' => $research->id,
                    ];
                })->has(
                    Question::factory(5)
                        ->state(function (array $attributes, Questionnaire $questionnaire) {
                            return [
                                'questionnaire_id' => $questionnaire->id,
                            ];
                        })
                ))
            ->create();

        Question::get()->each(function (Question $question) {
            if ($question->type !== 'text') {
                Option::factory(4)->state(function () use ($question) {
                    return [
                        'question_id' => $question->id,
                    ];
                })->create();
            }
        });
    }
}
