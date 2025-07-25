<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Sr. Administrador',
            'email' => 'administrador@twincode.com.br',
            'password' => Hash::make('Admin@TwinCode#2025'),
        ]);

        $this->call([
            ResearchSeeder::class,
        ]);
    }
}
