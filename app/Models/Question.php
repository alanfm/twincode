<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\Request;

class Question extends Model
{
    /** @use HasFactory<\Database\Factories\QuestionFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     * @see https://laravel.com/docs/12.x/eloquent-model#mass-assignment
     */
    protected $fillable = [
        'statement',
        'type',
        'questionnaire_id',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     * @see https://laravel.com/docs/12.x/eloquent-mutators#attribute-casting
     */
    public function casts(): array
    {
        return [
            'questionnaire_id' => 'integer',
            'type' => 'string',
            'statement' => 'string',
            'created_at' => 'datetime:d/m/Y H:i:s',
            'updated_at' => 'datetime:d/m/Y H:i:s',
        ];
    }

    /**
     * Get the questionnaire that owns the question.
     *
     * @return BelongsTo<Questionnaire, Question>
     */
    public function questionnaire(): BelongsTo
    {
        return $this->belongsTo(Questionnaire::class);
    }

    /**
     * Scope a query to only include questions that match the search criteria.
     *
     * @param  Builder  $query
     * @param  Questionnaire  $questionnaire
     * @param  Request  $request
     * @return array
     */
    public function scopeSearch(Builder $query, Questionnaire $questionnaire, Request $request): array
    {
        $query->when($request->search, function ($query) use ($questionnaire, $request) {
            $query->where('questionnaire_id', $questionnaire->id)
                ->where('statement', 'like', "%{$request->search}%");
        });

        $coutn = $query->count();
        $data = $query->orderBy('statement', 'ASC')->paginate(env('APP_RECORDS_PER_PAGE', 10));

        return [
            'count' => $coutn,
            'data' => $data,
            'search' => $request->search ?? '',
            'page' => $request->page ?? 1,
            'questionnaire' => $questionnaire,
        ];
    }
}
