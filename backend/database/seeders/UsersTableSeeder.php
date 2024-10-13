<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Carbon\Carbon;
use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder
{
    public $oneToNine;
    public $nineToOne;
    public $nineOnes;
    public $marcelo;
    public $lupita;
    public $users = [];
    public $company1Users = [];

    public function run($academicPeriodId)
    {
        $faker = Faker::create();
        $password = bcrypt('Estudiante1234*');
        $currentTimestamp = Carbon::now();

        // Crear algunos usuarios para las pruebas
        $this->oneToNine = User::create([
            'first_name' => 'User',
            'last_name' => 'One to Nine',
            'email' => '123456789@est.umss.edu',
            'password' => $password,
            'user_type' => 'E',
            'academic_period_id' => $academicPeriodId,
            'email_verified_at' => $currentTimestamp,
            'created_at' => $currentTimestamp,
            'updated_at' => $currentTimestamp,
        ]);

        $this->nineToOne = User::create([
            'first_name' => 'User',
            'last_name' => 'Nine to One',
            'email' => '987654321@est.umss.edu',
            'password' => $password,
            'user_type' => 'E',
            'academic_period_id' => $academicPeriodId,
            'email_verified_at' => $currentTimestamp,
            'created_at' => $currentTimestamp,
            'updated_at' => $currentTimestamp,
        ]);

        $this->nineOnes = User::create([
            'first_name' => 'User',
            'last_name' => 'Nine Ones',
            'email' => '111111111@est.umss.edu',
            'password' => $password,
            'user_type' => 'E',
            'academic_period_id' => $academicPeriodId,
            'email_verified_at' => $currentTimestamp,
            'created_at' => $currentTimestamp,
            'updated_at' => $currentTimestamp,
        ]);

        $this->marcelo = User::create([
            'first_name' => 'Marcelo',
            'last_name' => 'Ultimo',
            'email' => '111111112@est.umss.edu',
            'password' => $password,
            'user_type' => 'E',
            'academic_period_id' => $academicPeriodId,
            'email_verified_at' => $currentTimestamp,
            'created_at' => $currentTimestamp,
            'updated_at' => $currentTimestamp,
        ]);

        $this->lupita = User::create([
            'first_name' => 'Lupita',
            'last_name' => 'Terceros',
            'email' => '111121111@est.umss.edu',
            'password' => $password,
            'user_type' => 'E',
            'academic_period_id' => $academicPeriodId,
            'email_verified_at' => $currentTimestamp,
            'created_at' => $currentTimestamp,
            'updated_at' => $currentTimestamp,
        ]);

        // Crear 15 usuarios aleatorios
        for ($i = 0; $i < 15; $i++) {
            $this->users[] = User::create([
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'email' => $faker->unique()->safeEmail,
                'password' => $password,
                'user_type' => 'E',
                'academic_period_id' => $academicPeriodId,
                'email_verified_at' => $currentTimestamp,
                'created_at' => $currentTimestamp,
                'updated_at' => $currentTimestamp,
            ]);
        }

        for ($i = 0; $i < 5; $i++) {
            $this->company1Users[] = User::create([
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'email' => $faker->unique()->safeEmail,
                'password' => $password,
                'user_type' => 'E',
                'academic_period_id' => $academicPeriodId,
                'email_verified_at' => $currentTimestamp,
                'created_at' => $currentTimestamp,
                'updated_at' => $currentTimestamp,
            ]);
        }
    }
}
