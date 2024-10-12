<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $teacherAndAcademicPeriodSeeder = new TeacherAndAcademicPeriod();
        $teacherAndAcademicPeriodSeeder->run();

        $academicPeriodId = $teacherAndAcademicPeriodSeeder->academicPeriod2024->id;

        $usersTableSeeder = new UsersTableSeeder();
        $usersTableSeeder->run($academicPeriodId);

    }
}
