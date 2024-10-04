<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'user_type',
        'academic_period_id', // Añadido para asociar al estudiante con el periodo académico
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the user's full name.
     *
     * @return string
     */
    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function getUserTypeDescriptionAttribute()
    {
        return $this->user_type === 'E' ? 'Estudiante' : 'Docente';
    }

    public function academicPeriod()
    {
        return $this->belongsTo(AcademicPeriod::class, 'academic_period_id');
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }

    public function companies()
    {
        return $this->belongsToMany(Company::class, 'company_user')
            ->withPivot('status', 'permission') // Incluye los campos adicionales
            ->withTimestamps();
    }

    public function scoredCompanies()
    {
        return $this->belongsToMany(Company::class, 'company_user_score')
            ->using(CompanyUserScore::class)
            ->withPivot('score')
            ->withTimestamps();
    }

    public function evaluationsGiven()
    {
        return $this->hasMany(UserEvaluation::class, 'evaluator_id');
    }

    public function evaluationsReceived()
    {
        return $this->hasMany(UserEvaluation::class, 'evaluatee_id');
    }
}
