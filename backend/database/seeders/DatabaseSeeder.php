<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $teacherAndAcademicPeriodSeeder = new TeacherAndAcademicPeriod();
        $teacherAndAcademicPeriodSeeder->run();

        $academicPeriod = $teacherAndAcademicPeriodSeeder->academicPeriod2024;

        $usersTableSeeder = new UsersTableSeeder();
        $usersTableSeeder->run($academicPeriod->id);

        $companiesTableSeeder = new CompaniesTableSeeder();
        $companiesTableSeeder->run($academicPeriod->id);

        $pendingCompaniesSeeder = new PendingCompaniesSeeder();
        $pendingCompaniesSeeder->run($academicPeriod->id);

        $activeCompaniesSeeder = new ActiveCompaniesSeeder();
        $activeCompaniesSeeder->run($academicPeriod->id, $academicPeriod->start_date, $academicPeriod->end_date);

        $evaluationSeeder = new EvaluationSeeder();
        $evaluationSeeder->run($teacherAndAcademicPeriodSeeder->boris->id, $academicPeriod->id);
    }
}
