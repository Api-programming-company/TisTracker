<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CompanyUser;
use App\Models\Company;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class ActiveCompaniesSeeder extends Seeder
{
    public function run($academicPeriodId)
    {
        $faker = Faker::create();
        for ($i = 0; $i < 10; $i++) {
            $company = Company::create([
                'long_name' => Str::limit($faker->unique()->company, 32),
                'short_name' => strtoupper(substr($faker->unique()->word, 0, 8)),
                'email' => $faker->unique()->companyEmail,
                'address' => $faker->address,
                'phone' => $faker->unique()->numerify('########'),
                'academic_period_id' => $academicPeriodId,
                'status' => 'A',
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
