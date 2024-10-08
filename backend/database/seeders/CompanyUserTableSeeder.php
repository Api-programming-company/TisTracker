<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CompanyUser;
use Carbon\Carbon;
class CompanyUserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Definir una fecha común para created_at y updated_at
        $now = Carbon::now();

        // Relaciones entre compañías y usuarios
        $companyUsers = [
            [
                'id' => 1,
                'company_id' => 1, // Company A
                'user_id' => 6,
                'status' => 'A',    // Aceptado
                'permission' => 'W', // Write
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 2,
                'company_id' => 1, // Company A
                'user_id' => 3,    // User One to Nine (Estudiante)
                'status' => 'A',    // Aceptado
                'permission' => 'R', // Read
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 3,
                'company_id' => 1, // Company A
                'user_id' => 4,    // User Nine to One (Estudiante)
                'status' => 'P',    // Pendiente
                'permission' => 'R', // Read
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 4,
                'company_id' => 2, // Company B
                'user_id' => 7,
                'status' => 'A',    // Pendiente
                'permission' => 'W', // Write
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 5,
                'company_id' => 2, // Company B
                'user_id' => 5,    // User Nine Ones (Estudiante)
                'status' => 'P',    // Aceptado
                'permission' => 'R', // Read
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 6,
                'company_id' => 3, // Company B
                'user_id' => 5,    // User Nine Ones (Estudiante)
                'status' => 'P',    // Aceptado
                'permission' => 'R', // Read
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 7,
                'company_id' => 4, // Company B
                'user_id' => 5,    // User Nine Ones (Estudiante)
                'status' => 'P',    // Aceptado
                'permission' => 'R', // Read
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 8,
                'company_id' => 5, // Company B
                'user_id' => 5,    // User Nine Ones (Estudiante)
                'status' => 'P',    // Aceptado
                'permission' => 'R', // Read
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];
        // Insertar las relaciones en la base de datos
        foreach ($companyUsers as $companyUser) {
            CompanyUser::create($companyUser);
        }
    }
}
