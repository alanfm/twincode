<?php

namespace Database\Factories;

use App\Models\Research;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Research>
 */
class ResearchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'key' => Str::upper(Str::random(16)),
            'title' => $this->faker->sentence(6),
            'description' => $this->faker->paragraph(3),
            'author' => $this->faker->name(),
            'institution' => $this->faker->company(),
            'status' => $this->faker->randomElement(Research::STATUS),
        ];
    }
}
