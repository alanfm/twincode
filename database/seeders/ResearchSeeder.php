<?php

namespace Database\Seeders;

use App\Models\Comparison;
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
        Research::factory(26)
            ->has(
                Comparison::factory(5)->state(function (array $attributes, Research $research) {
                    return [
                        'research_id' => $research->id,
                    ];
                }))
            ->has(Questionnaire::factory(1)->state(function (array $attributes, Research $research) {
                return [
                    'respondable_type' => Research::class,
                    'respondable_id' => $research->id,
                ];
            }))
            ->create();
    }
}
