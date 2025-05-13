<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Http\Request;

class Questionnaire extends Model
{
    /** @use HasFactory<\Database\Factories\QuestionnaireFactory> */
    use HasFactory;

    const POSITIONS = [
        'initial',
        'final',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     * @see https://laravel.com/docs/12.x/eloquent-model#mass-assignment
     */
    protected $fillable = [
        'description',
        'position',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @return list<string>
     * @see https://laravel.com/docs/12.x/eloquent-mutators#attribute-casting
     */
    public function casts(): array
    {
        return [
            'description' => 'string',
            'position' => 'string',
            'created_at' => 'datetime:d/m/Y H:i:s',
            'updated_at' => 'datetime:d/m/Y H:i:s',
        ];
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @return MorphTo
     * @see https://laravel.com/docs/12.x/eloquent-relationships#polymorphic-relationships
     */
    public function respondable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Get the questions for the questionnaire.
     *
     * @return HasMany<Question, Questionnaire>
     * @see https://laravel.com/docs/12.x/eloquent-relationships#one-to-many
     */
    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }

    /**
     * Scope a query to only include questionnaires that match the search criteria.
     *
     * @param  Builder  $query
     * @param  Request  $request
     * @return array
     */
    public function scopeSearch(Builder $query, Request $request): array
    {
        $query->where('respondable_type', "App\\Models\\$request->respondable")
            ->where('respondable_id', $request->id)
            ->where(function (Builder $query) use ($request) {
                $query->when($request->search, function (Builder $query) use ($request) {
                    $query->where('description', 'like', "%{$request->search}%");
                });
            });

        $count = $query->count();
        $data = $query->orderBy('description', 'ASC')->paginate(env('APP_RECORDS_PER_PAGE', 10));

        return [
            'count' => $count,
            'data' => $data,
            'search' => $request->search ?? '',
            'page' => $request->page ?? 1,
        ];
    }
}
