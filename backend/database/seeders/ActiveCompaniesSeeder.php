<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CompanyUser;
use App\Models\Company;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Models\Deliverable;
use App\Models\Planning;
use App\Models\Milestone;

class ActiveCompaniesSeeder extends Seeder
{
    public function run($academicPeriodId, $academicPeriodStartDate, $academicPeriodEndDate)
    {
        $faker = Faker::create();
        for ($i = 0; $i < 10; $i++) {
            $company = Company::create([
                'long_name' => Str::limit($faker->unique()->company, 32),
                'short_name' => strtoupper(substr($faker->unique()->word, 0, 8)),
                'email' => $faker->unique()->companyEmail,
                'address' => $faker->address,
                'phone' => $faker->unique()->numerify('########'),
                'academic_period_id' => $academicPeriodId,
                'status' => 'A',
            ]);

            $owner = User::create([
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'email' => $faker->unique()->safeEmail,
                'password' => bcrypt('Estudiante1234*'),
                'user_type' => 'E',
                'academic_period_id' => $academicPeriodId,
                'email_verified_at' => now(),
            ]);

            CompanyUser::create([
                'company_id' => $company->id,
                'user_id' => $owner->id,
                'permission' => 'W',
                'status' => 'A',
            ]);
            $numberOfMembers = rand(2, 5);
            for ($j = 0; $j < $numberOfMembers; $j++) {
                $reader = User::create([
                    'first_name' => $faker->firstName,
                    'last_name' => $faker->lastName,
                    'email' => $faker->unique()->safeEmail,
                    'password' => bcrypt('Estudiante1234*'),
                    'user_type' => 'E',
                    'academic_period_id' => $academicPeriodId,
                    'email_verified_at' => now(),
                ]);

                CompanyUser::create([
                    'company_id' => $company->id,
                    'user_id' => $reader->id,
                    'permission' => 'R',
                    'status' => 'A',
                ]);
            }

            // Crear un Planning para la empresa
            $planning = Planning::create([
                'name' => $faker->sentence(3),
                'company_id' => $company->id,
            ]);

            // Generar entre 2 y 4 Milestones aleatorios para el Planning
            $numberOfMilestones = rand(3, 5);

            // Calcular la duración total del período académico
            $academicPeriodStartDate = Carbon::parse($academicPeriodStartDate);
            $academicPeriodEndDate = Carbon::parse($academicPeriodEndDate);
            $totalDuration = $academicPeriodEndDate->diffInDays($academicPeriodStartDate);

            // Calcular la duración de cada milestone
            $milestoneDuration = intdiv($totalDuration, $numberOfMilestones);

            // Inicializar la cantidad total de porcentaje de facturación disponible
            $totalBillingPercentage = 100;

            for ($k = 0; $k < $numberOfMilestones; $k++) {
                // Calcular fechas de inicio y fin para cada milestone
                $startDate = $academicPeriodStartDate->copy()->addDays($k * $milestoneDuration);
                $endDate = $startDate->copy()->addDays($milestoneDuration - 1); // menos 1 porque el final es inclusivo

                // Calcular el porcentaje de facturación del milestone actual
                if ($k === $numberOfMilestones - 1) {
                    // Si es el último Milestone, usar el porcentaje restante
                    $billingPercentage = $totalBillingPercentage;
                } else {
                    // Generar un porcentaje aleatorio proporcional al restante
                    $maxPercentage = $totalBillingPercentage / ($numberOfMilestones - $k);
                    $billingPercentage = $faker->randomFloat(2, 0, $maxPercentage);
                }

                // Reducir el total de porcentaje disponible
                $totalBillingPercentage -= $billingPercentage;

                $milestone = Milestone::create([
                    'name' => $faker->sentence(2),
                    'start_date' => $startDate,
                    'end_date' => $endDate,
                    'billing_percentage' => $billingPercentage,
                    'planning_id' => $planning->id,
                ]);

                // Generar entre 1 y 3 Deliverables aleatorios para cada Milestone
                $numberOfDeliverables = rand(1, 3);
                for ($l = 0; $l < $numberOfDeliverables; $l++) {
                    Deliverable::create([
                        'name' => $faker->sentence(2),
                        'responsible' => $faker->name,
                        'objective' => $faker->paragraph,
                        'milestone_id' => $milestone->id,
                    ]);
                }
            }


        }
    }
}
