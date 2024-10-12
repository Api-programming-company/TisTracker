<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\CompanyUser;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\User;

class PendingCompaniesSeeder extends Seeder
{
    public function run($academicPeriodId)
    {
        $faker = Faker::create();

        for ($i = 0; $i < 15; $i++) {
            $company = Company::create([
                'long_name' => $faker->unique()->company,
                'short_name' => strtoupper($faker->unique()->word),
                'email' => $faker->unique()->companyEmail,
                'address' => $faker->address,
                'phone' => $faker->unique()->numerify('########'),
                'academic_period_id' => $academicPeriodId,
                'status' => 'P',
            ]);

            $owner = User::create([
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'email' => $faker->unique()->safeEmail,
                'password' => bcrypt('Estudiante1234*'),
                'user_type' => 'E',
                'academic_period_id' => $academicPeriodId,
                'email_verified_at' => now(),
            ]);

            CompanyUser::create([
                'company_id' => $company->id,
                'user_id' => $owner->id,
                'permission' => 'W',
                'status' => 'A',
            ]);
            $numberOfMembers = rand(2, 5);
            for ($j = 0; $j < $numberOfMembers; $j++) {
                $reader = User::create([
                    'first_name' => $faker->firstName,
                    'last_name' => $faker->lastName,
                    'email' => $faker->unique()->safeEmail,
                    'password' => bcrypt('Estudiante1234*'),
                    'user_type' => 'E',
                    'academic_period_id' => $academicPeriodId,
                    'email_verified_at' => now(),
                ]);
            
                CompanyUser::create([
                    'company_id' => $company->id,
                    'user_id' => $reader->id,
                    'permission' => 'R',
                    'status' => 'A',
                ]);
            }

        }
    }
}
