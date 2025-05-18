<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Option extends Model
{
    /** @use HasFactory<\Database\Factories\OptionFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     * @see https://laravel.com/docs/12.x/eloquent-model#mass-assignment
     */
    protected $fillable = [
        'description',
        'question_id',
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
            'question_id' => 'integer',
            'description' => 'string',
            'created_at' => 'datetime:d/m/Y H:i:s',
            'updated_at' => 'datetime:d/m/Y H:i:s',
        ];
    }

    /**
     * Get the question that owns the option.
     *
     * @return BelongsTo<Question, Option>
     */
    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }

    /**
     * Get the answers for the option.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany<Answer>
     */
    public function participants(): BelongsToMany
    {
        return $this->belongsToMany(Participant::class, 'participant_option');
    }
}
