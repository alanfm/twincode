<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
