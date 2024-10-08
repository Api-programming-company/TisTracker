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
            'id' => 1,
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
            'id' => 2,
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
        Company::create([
            'id' => 3,
            'long_name' => 'Company C',
            'short_name' => 'C.C',
            'email' => '333333333@est.umss.edu',
            'address' => 'Av. Principal',
            'phone' => '78945612',
            'academic_period_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'status' => 'A',
        ]);

        Company::create([
            'id' => 4,
            'long_name' => 'Company D',
            'short_name' => 'C.D',
            'email' => '444444444@est.umss.edu',
            'address' => 'Calle Falsa 123',
            'phone' => '12345678',
            'academic_period_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'status' => 'P',
        ]);

        Company::create([
            'id' => 5,
            'long_name' => 'Company E',
            'short_name' => 'C.E',
            'email' => '555555555@est.umss.edu',
            'address' => 'Av. Libertad',
            'phone' => '87654321',
            'academic_period_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'status' => 'C',
        ]);

        Company::create([
            'id' => 6,
            'long_name' => 'Company F',
            'short_name' => 'C.F',
            'email' => '666666666@est.umss.edu',
            'address' => 'Calle Real',
            'phone' => '65432198',
            'academic_period_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'status' => 'A',
        ]);
    }
}
