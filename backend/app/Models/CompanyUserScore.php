<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyUserScore extends Model
{
    use HasFactory;

    protected $fillable = ['company_user_id', 'company_id', 'score'];

    public function companyUser()
    {
        return $this->belongsTo(CompanyUser::class, 'company_user_id');
    }

    public function user()
    {
        return $this->hasOneThrough(User::class, CompanyUser::class, 'id', 'id', 'company_user_id', 'user_id');
    }
}
