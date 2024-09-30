<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\AcademicPeriod;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'long_name',
        'short_name',
        'email',
        'address',
        'phone',
        'academic_period_id',
        'status',
    ];

    public function academicPeriod()
    {
        return $this->belongsTo(AcademicPeriod::class);
    }
    public function members()
    {
        return $this->belongsToMany(User::class, 'company_user')
            ->withPivot('id', 'status', 'permission') // Incluye los campos adicionales
            ->withTimestamps();
    }

    public function planning()
    {
        return $this->hasOne(Planning::class);
    }
}
