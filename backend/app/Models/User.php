<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\CompanyUserScore;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'first_name',
        'last_name',
        'email',
        'password',
        'user_type',
        'academic_period_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = ['company', 'academic_period', 'full_name'];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function companyUsers()
    {
        return $this->hasMany(CompanyUser::class);
    }

    public function getFullNameAttribute()
    {
        return ucwords("{$this->first_name} {$this->last_name}");
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
            ->whereIn('permission', ['W', 'R'])
            ->where('status', 'A')
            ->first();
        return $companyUser;
    }

    public function companyForGrades()
    {
        return $this->hasOneThrough(
            Company::class,
            CompanyUser::class,
            'user_id',        // Foreign key on CompanyUser table
            'id',             // Foreign key on Company table
            'id',             // Local key on User table
            'company_id'      // Local key on CompanyUser table
        )->whereIn('company_users.permission', ['W', 'R'])
            ->where('company_users.status', 'A');
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
