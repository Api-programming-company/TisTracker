<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    public function run($academicPeriodId)
    {
        $password = bcrypt('Estudiante1234*');
        $currentTimestamp = Carbon::now();

        // Crear algunos usuarios para las pruebas
        User::create([
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

        User::create([
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

        User::create([
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

        User::create([
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

        User::create([
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
    }
}
