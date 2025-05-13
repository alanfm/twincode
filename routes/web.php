<?php

use App\Http\Controllers\Admin\ComparisonController;
use App\Http\Controllers\Admin\QuestionController;
use App\Http\Controllers\Admin\QuestionnaireController;
use App\Http\Controllers\Admin\ResearchController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');
// ->middleware(['auth', 'verified'])->

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::prefix('admin')->middleware(['auth'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('admin.home');
    Route::resource('research', ResearchController::class);
    Route::resource('research.comparison', ComparisonController::class);
    Route::resource('{respondable}/{id}/questionnaires', QuestionnaireController::class)
        ->whereNumber('id')
        ->whereAlpha('respondable');
    Route::resource('questionnaires.questions', QuestionController::class);
    Route::resource('users', UserController::class);
});
