<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class Participant extends Model
{
    protected $fillable = [
        'research_id',
        'name',
        'email',
    ];

    public function research()
    {
        return $this->belongsTo(Research::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function options()
    {
        return $this->belongsToMany(Option::class);
    }

    /**
     * The attributes that should be cast to native types.
     *
     * @var list<array>
     */
    public function scopeSearch(Builder $query, Request $request, Research $research): array
    {
        $query->where('research_id', $research->id)->when($request->search, function ($query) use ($request) {
            $query->where('name', 'like', "%{$request->search}%")
                ->orWhere('email', 'like', "%{$request->search}%");
        });

        $count = $query->count();
        $data = $query->orderBy('name', 'ASC')->paginate(env('APP_RECORDS_PER_PAGE', 10));
        return [
            'count' => $count,
            'data' => $data->appends(['search' => $request->search?? '']),
            'search' => $request->search?? '',
            'page' => $request->page?? 1
        ];
    }
}
