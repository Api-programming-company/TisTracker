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

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'user_type',
        'academic_period_id', // Añadido para asociar al estudiante con el periodo académico
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = ['company', 'academic_period'];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

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

    public function getAcademicPeriodAttribute()
    {
        return $this->academicPeriod()->first();
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }

    public function companies()
    {
        return $this->belongsToMany(Company::class, CompanyUser::class);
    }

    public function getCompanyAttribute()
    {
        $companyUser = CompanyUser::where('user_id', $this->id)
        ->where('permission', 'W')
        ->where('status', 'A')
        ->first();
        return $companyUser;
    }

    public function company()
    {
        $companyUser = $this->companies()->wherePivot('permission', 'W')->first();
        return $companyUser ? $companyUser : null;
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
    public static function getFieldLabels()
    {
        return [
            'first_name' => 'nombre',
            'last_name' => 'apellido',
            'password' => 'contraseña',
            'email' => 'correo electrónico',
            'user_type' => 'tipo de usuario',
            'academic_period_id' => 'periodo académico',
        ];
    }
}
