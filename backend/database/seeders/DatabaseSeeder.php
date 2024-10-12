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

        $academicPeriodId = $teacherAndAcademicPeriodSeeder->academicPeriod2024->id;

        $usersTableSeeder = new UsersTableSeeder();
        $usersTableSeeder->run($academicPeriodId);

        $companiesTableSeeder = new CompaniesTableSeeder();
        $companiesTableSeeder->run($academicPeriodId);

        $pendingCompaniesSeeder = new PendingCompaniesSeeder();
        $pendingCompaniesSeeder->run($academicPeriodId);

        $activeCompaniesSeeder = new ActiveCompaniesSeeder();
        $activeCompaniesSeeder->run($academicPeriodId);

        $evaluationSeeder = new EvaluationSeeder();
        $evaluationSeeder->run($teacherAndAcademicPeriodSeeder->boris->id);
    }
}
