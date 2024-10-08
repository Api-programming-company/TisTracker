<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Carbon\Carbon;
class UsersTableSeeder extends Seeder
{
    public function run()
    {
        // Crear algunos usuarios para las pruebas

        User::create([
            'id' => 3,
            'first_name' => 'User',
            'last_name' => 'One to Nine',
            'email' => '123456789@est.umss.edu',
            'password' => bcrypt('Estudiante1234*'),
            'user_type' => 'E', 
            'academic_period_id' => 1, 
            'email_verified_at' => Carbon::now(), 
            'created_at' => Carbon::now(), 
            'updated_at' => Carbon::now(), 
        ]);

        User::create([
            'id' => 4,
            'first_name' => 'User',
            'last_name' => 'Nine to One',
            'email' => '987654321@est.umss.edu',
            'password' => bcrypt('Estudiante1234*'),
            'user_type' => 'E', 
            'academic_period_id' => 1, 
            'email_verified_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        User::create([
            'id' => 5,
            'first_name' => 'User',
            'last_name' => 'Nine Ones',
            'email' => '111111111@est.umss.edu',
            'password' => bcrypt('Estudiante1234*'),
            'user_type' => 'E',
            'academic_period_id' => 1, 
            'email_verified_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
