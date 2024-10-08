<?php

namespace Database\Seeders;

use App\Models\AcademicPeriod;
use Illuminate\Database\Seeder;
use App\Models\User;
use Carbon\Carbon;

class TeacherAndAcademicPeriod extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        User::create([
            'id' => 1,
            'first_name' => 'BORIS MARCELO',
            'last_name' => 'CALANCHA NAVIA',
            'email' => 'boris@fcyt.umss.edu.bo',
            'password' => bcrypt('Boris1234*'),
            'user_type' => 'D',
            'email_verified_at' => Carbon::now(), 
            'created_at' => Carbon::now(), 
            'updated_at' => Carbon::now(), 
        ]);
        User::create([
            'id' => 2,
            'first_name' => 'Por',
            'last_name' => 'Designar',
            'email' => 'pordesignar@fcyt.umss.edu.bo',
            'password' => bcrypt('Docente1234*'),
            'user_type' => 'D',
            'email_verified_at' => Carbon::now(), 
            'created_at' => Carbon::now(), 
            'updated_at' => Carbon::now(), 
        ]);
        AcademicPeriod::create([
            'id' => 1,
            'name' => '2do semestre 2024',
            'start_date' => '2024-06-01',
            'end_date' => '2024-12-15',
            'description' => '2do semestre 2024 de tis docente Boris Calancha',
            'user_id' => 1,
        ]);
        AcademicPeriod::create([
            'id' => 2,
            'name' => '1er semestre 2021',
            'start_date' => '2021-01-01',
            'end_date' => '2021-06-15',
            'description' => '1er semestre 2021 de tis docente Boris Calancha',
            'user_id' => 1,
        ]);
    }
}
