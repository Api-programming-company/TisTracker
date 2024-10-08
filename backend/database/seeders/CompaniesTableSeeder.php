<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;
use Carbon\Carbon;
class CompaniesTableSeeder extends Seeder
{
    public function run()
    {
        Company::create([
            'long_name' => 'Company A',
            'short_name' => 'C.A',
            'email' => '111111111@est.umss.edu',
            'address' => 'Av.Siempre Viva',
            'phone' => '75698435',
            'academic_period_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'status' => 'P',
        ]);

        Company::create([
            'long_name' => 'Company B',
            'short_name' => 'C.B',
            'email' => '222222222@est.umss.edu',
            'address' => 'Av.LIMA',
            'phone' => '69453628',
            'academic_period_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'status' => 'C',
        ]);
    }
}
