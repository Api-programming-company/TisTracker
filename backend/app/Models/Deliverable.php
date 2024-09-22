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
    ];

    // Relación con Milestone
    public function milestone()
    {
        return $this->belongsTo(Milestone::class);
    }
}