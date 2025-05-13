<?php

namespace Database\Factories;

use App\Models\Questionnaire;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'statement' => $this->faker->sentence(),
            'type' => $this->faker->randomElement(['text', 'radio', 'checkbox']),
            'questionnaire_id' => Questionnaire::get()->random()->id,
        ];
    }
}
