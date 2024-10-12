<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class CompanyUser extends Pivot
{
    protected $fillable = [
        'company_id',
        'user_id',
        'status', 
        'permission', 
    ];

    // Relación con el modelo Company
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    // Relación con el modelo User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
