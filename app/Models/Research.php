<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Http\Request;

class Research extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'author',
        'institution',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var list<string>
     */
    public function casts(): array
    {
        return [
            'title' => 'string',
            'description' => 'string',
            'author' => 'string',
            'institution' => 'string',
            'created_at' => 'datetime:d/m/Y H:i:s',
            'updated_at' => 'datetime:d/m/Y H:i:s',
        ];
    }

    /**
     * The attributes that should be cast to native types.
     *
     * @var list<array>
     */
    public function scopeSearch(Builder $query, Request $request): array
    {
        $query->when($request->search, function ($query) use ($request) {
            $query->where('title', 'like', "%{$request->search}%")
                ->orWhere('description', 'like', "%{$request->search}%")
                ->orWhere('author', 'like', "%{$request->search}%")
                ->orWhere('institution', 'like', "%{$request->search}%");
        });

        $count = $query->count();
        $data = $query->orderBy('title', 'ASC')->paginate(env('APP_RECORDS_PER_PAGE', 10));
        return [
            'count' => $count,
            'data' => $data->appends(['search' => $request->search?? '']),
            'search' => $request->search?? '',
            'page' => $request->page?? 1
        ];
    }

    /**
     * The comparisons that belong to the research.
     *
     * @return HasMany
     */
    public function comparisons(): HasMany
    {
        return $this->hasMany(Comparison::class);
    }

    /**
     * The questionnaires that belong to the research.
     *
     * @return MorphOne
     */
    public function questionnaire(): MorphOne
    {
        return $this->morphOne(Questionnaire::class, 'respondable');
    }
}
