<?php

namespace Database\Seeders;

use App\Models\AcademicPeriod;
use Illuminate\Database\Seeder;
use App\Models\User;
use Carbon\Carbon;

class TeacherAndAcademicPeriod extends Seeder
{
    public $boris;
    public $pordesignar;
    public $academicPeriod2024;
    public $academicPeriod2021_1;
    public $academicPeriod2021_2;

    public function run()
    {
        $this->boris = User::create([
            'first_name' => 'BORIS MARCELO',
            'last_name' => 'CALANCHA NAVIA',
            'email' => 'boris@fcyt.umss.edu.bo',
            'password' => bcrypt('Boris1234*'),
            'user_type' => 'D',
            'email_verified_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $this->pordesignar = User::create([
            'first_name' => 'Por',
            'last_name' => 'Designar',
            'email' => 'pordesignar@fcyt.umss.edu.bo',
            'password' => bcrypt('Docente1234*'),
            'user_type' => 'D',
            'email_verified_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $this->academicPeriod2024 = AcademicPeriod::create([
            'name' => '2do semestre 2024',
            'start_date' => '2024-06-01',
            'end_date' => '2024-12-15',
            'description' => '2do semestre 2024 de tis docente Boris Calancha',
            'user_id' => $this->boris->id,
        ]);

        $this->academicPeriod2021_1 = AcademicPeriod::create([
            'name' => '1er semestre 2021',
            'start_date' => '2021-01-01',
            'end_date' => '2021-06-01',
            'description' => '1er semestre 2021 de tis docente Por Designar',
            'user_id' => $this->pordesignar->id,
        ]);

        $this->academicPeriod2021_2 = AcademicPeriod::create([
            'name' => '2do semestre 2021',
            'start_date' => '2021-06-01',
            'end_date' => '2021-12-15',
            'description' => '2do semestre 2021 de tis docente Por Designar',
            'user_id' => $this->pordesignar->id,
        ]);
    }
}
