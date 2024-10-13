<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;
use Carbon\Carbon;
use Faker\Factory as Faker;
class CompaniesTableSeeder extends Seeder
{
    public $companies;
    public function run($academicPeriodId){
        $faker = Faker::create();

        Company::create([
            'long_name' => $faker->unique()->company,
            'short_name' => strtoupper($faker->unique()->word),
            'email' => $faker->unique()->companyEmail,
            'address' => $faker->address,
            'phone' => $faker->unique()->numerify('########'),
            'academic_period_id' => $academicPeriodId,
            'status' => 'A',
        ]);
    }
}
