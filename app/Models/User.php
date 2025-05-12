<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'created_at' => 'datetime:d-m-Y H:i:s',
            'updated_at' => 'datetime:d-m-Y H:i:s',
        ];
    }

    public function scopeSearch(Builder $query, Request $request): array
    {
        $query->when($request->search, function ($query) use ($request) {
            $query->where('name', 'like', "%{$request->search}%")
                ->orWhere('email', 'like', "%{$request->search}%");
        });

        $count = $query->count();
        $pagination = $query->orderBy('name')->paginate(10);

        return [
            'count' => $count,
            'data' => $pagination->appends([
                'search' => $request->search,
            ]),
            'search' => $request->search?? '',
            'page' => $request->page?? 1,
        ];
    }
}
