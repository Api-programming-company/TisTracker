<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

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
            'name' => 'User 1',
            'email' => '123456789@est.umss.edu',
            'password' => bcrypt('password123'),
        ]);

        User::create([
            'name' => 'User 2',
            'email' => '113456789@est.umss.edu',
            'password' => bcrypt('password123'),
        ]);

        User::create([
            'name' => 'User 3',
            'email' => '122456789@est.umss.edu',
            'password' => bcrypt('password123'),
        ]);
    }
}
