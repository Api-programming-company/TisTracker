<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Milestone extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'billing_percentage',
        'planning_id',
    ];

    // Relación con Planning
    public function planning()
    {
        return $this->belongsTo(Planning::class);
    }
}
