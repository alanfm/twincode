<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Http\Request;

class Comparison extends Model
{
    /** @use HasFactory<\Database\Factories\ComparisonFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'description',
        'language',
        'snippet_code_1',
        'snippet_code_2',
        'observation',
        'research_id',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var list<string>
     */
    public function casts(): array
    {
        return [
            'description' => 'string',
            'language' => 'string',
            'snippet_code_1' => 'string',
            'snippet_code_2' => 'string',
            'observation' => 'string',
            'research_id' => 'integer',
            'created_at' => 'datetime:d/m/Y H:i:s',
            'updated_at' => 'datetime:d/m/Y H:i:s',
        ];
    }

    /**
     * The research that owns the comparison.
     *
     * @return BelongsTo
     */
    public function research(): BelongsTo
    {
        return $this->belongsTo(Research::class)->withDefault();
    }

    /**
     * The questionnaire that belongs to the comparison.
     *
     * @return MorphOne
     */
    public function questionnaires(): MorphMany
    {
        return $this->morphMany(Questionnaire::class, 'respondable');
    }

    /**
     * Scope a query to search for comparisons.
     *
     * @param Builder $query
     * @param Research $research
     * @param Request $request
     *
     * @return list<string>
     */
    public function scopeSearch(Builder $query, Research $research, Request $request): array
    {
        $query->where('research_id', $research->id)
            ->where(function ($query) use ($request) {
                $query->where('description', 'like', "%{$request->search}%")
                    ->orWhere('observation', 'like', "%{$request->search}%");
            });

        $count = $query->count();
        $data = $query->orderBy('description', 'ASC')->paginate(env('APP_RECORDS_PER_PAGE', 10));

        return [
            'count' => $count,
            'data' => $data,
            'search' => $request->search ?? '',
            'page' => $request->page ?? 1,
            'research' => $research,
        ];
    }
}
