<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deliverable extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'responsible',
        'objective',
        'milestone_id',
        'expected_result',
        'actual_result',
        'observations',
        'status',
        'created_by'
    ];

    public function milestone()
    {
        return $this->belongsTo(Milestone::class);
    }
}
