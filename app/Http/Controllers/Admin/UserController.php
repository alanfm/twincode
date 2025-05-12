<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Admin/User/Index', array_merge(User::search($request), []));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return Inertia::render('Admin/User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        try {
            $user = User::create($request->validated());

            return Redirect::route('users.show', $user)->with('alert', [
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
    public function show(User $user)
    {
        return Inertia::render('Admin/User/Show', [
            'user' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('Admin/User/Edit', [
            'user' => $user->only('id', 'name', 'email'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            $user->update($request->only('name', 'email'));

            if ($request->password != '') {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                ])->setRememberToken(Str::random(60));

                $user->save();
            }

            return Redirect::route('users.show', $user)->with('alert', [
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
    public function destroy(User $user)
    {
        try {
            $user->delete();

            return Redirect::route('users.index')->with('alert', [
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
