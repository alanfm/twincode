<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Http\Request;

class Questionnaire extends Model
{
    /** @use HasFactory<\Database\Factories\QuestionnaireFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'description',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @return list<string>
     */
    public function casts(): array
    {
        return [
            'description' => 'string',
            'created_at' => 'datetime:d/m/Y H:i:s',
            'updated_at' => 'datetime:d/m/Y H:i:s',
        ];
    }

    /**
     *
     *
     * @return MorphTo
     */
    public function respondable(): MorphTo
    {
        return $this->morphTo();
    }

    public function scopeSearch(Builder $query, Request $request): array
    {
        $query->where('respondable_type', $request->respondable)
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
            'page' => $request->page ?? 1
        ];
    }
}
