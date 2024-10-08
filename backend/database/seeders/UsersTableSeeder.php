<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Carbon\Carbon;
class UsersTableSeeder extends Seeder
{
    public function run()
    {
        // Crear un docente
        /** 
        *User::create([ ya existe 
        *    'id' => 5,
         *   'name' => 'BORIS MARCELO CALANCHA NAVIA',
          *  'email' => 'boris@fcyt.umss.edu.bo',
           * 'password' => bcrypt('password123'), 
        *]);
        */ 

        // Crear algunos usuarios para las pruebas
        User::create([
            'id' => 101,
            'first_name' => 'User',
            'last_name' => 'One',
            'email' => '123456789@est.umss.edu',
            'password' => bcrypt('password123'),
            'user_type' => 'E', 
            'academic_period_id' => 1, 
            'email_verified_at' => Carbon::now(), 
            'created_at' => Carbon::now(), 
            'updated_at' => Carbon::now(), 
        ]);

        User::create([
            'id' => 102,
            'first_name' => 'User',
            'last_name' => 'Two',
            'email' => '113456789@est.umss.edu',
            'password' => bcrypt('password123'),
            'user_type' => 'E', 
            'academic_period_id' => 1, 
            'email_verified_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        User::create([
            'id' => 103,
            'first_name' => 'User',
            'last_name' => 'Three',
            'email' => '122456789@est.umss.edu',
            'password' => bcrypt('password123'),
            'user_type' => 'E',
            'academic_period_id' => 1, 
            'email_verified_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
