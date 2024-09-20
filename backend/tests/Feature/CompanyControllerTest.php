<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Company;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;
use App\Models\AcademicPeriod;

class CompanyControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    /** @test */
    public function it_creates_a_company_with_valid_academic_period()
    {
        // Crear un periodo académico
        $academicPeriod = AcademicPeriod::factory()->create();

        // Crear un usuario con el periodo académico
        $user = User::factory()->create(['academic_period_id' => $academicPeriod->id]);

        // Autenticarse usando Sanctum
        Sanctum::actingAs($user);

        // Datos de la compañía
        $data = [
            'long_name' => 'Long Company Name',
            'short_name' => 'Short Name',
            'email' => 'company@example.com',
            'address' => '123 Main St',
            'phone' => '1234567890',
            'academic_period_id' => $academicPeriod->id, // Usar el ID creado
        ];

        // Realizar la solicitud
        $response = $this->post('api/companies', $data);

        // Verificar la respuesta
        $response->assertStatus(201);
        $response->assertJsonStructure([
            'message',
            'company' => [
                'id',
                'long_name',
                'short_name',
                'email',
                'address',
                'phone',
                'academic_period_id',
                'created_at',
                'updated_at',
            ]
        ]);

        // Verificar que la compañía se ha creado en la base de datos
        $this->assertDatabaseHas('companies', [
            'email' => 'company@example.com',
        ]);
    }

    /** @test */
    public function it_returns_error_when_academic_period_is_invalid()
    {
        // Crear un usuario sin periodo académico
        $user = User::factory()->create(['academic_period_id' => null]);

        // Autenticarse usando Sanctum
        Sanctum::actingAs($user);

        // Datos de la compañía
        $data = [
            'long_name' => 'Another Company',
            'short_name' => 'Another Name',
            'email' => 'another@example.com',
            'address' => '456 Another St',
            'phone' => '0987654321',
            'academic_period_id' => 999, // ID inválido
        ];

        // Realizar la solicitud
        $response = $this->post('api/companies', $data);

        // Verificar la respuesta
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Validation Error'
        ]);
    }

    /** @test */
    public function it_returns_companies_for_authenticated_user_with_academic_period()
    {
        // Crear un periodo académico
        $academicPeriod = AcademicPeriod::factory()->create();

        // Crear un usuario autenticado con el periodo académico
        $user = User::factory()->create(['academic_period_id' => $academicPeriod->id]);

        // Crear compañías asociadas a ese periodo académico
        Company::factory()->create(['academic_period_id' => $academicPeriod->id]);
        Company::factory()->create(['academic_period_id' => $academicPeriod->id]);

        // Autenticarse usando Sanctum
        Sanctum::actingAs($user);

        // Realizar la solicitud
        $response = $this->get('api/academic-periods/companies');

        // Verificar la respuesta
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'message',
            'companies' => [
                '*' => [
                    'id',
                    'long_name',
                    'short_name',
                    'email',
                    'address',
                    'phone',
                    'academic_period_id',
                    'created_at',
                    'updated_at',
                ]
            ]
        ]);
    }

    /** @test */
    public function it_returns_error_if_user_has_no_academic_period()
    {
        // Crear un usuario sin periodo académico
        $user = User::factory()->create(['academic_period_id' => null]);

        // Autenticarse usando Sanctum
        Sanctum::actingAs($user);

        // Realizar la solicitud
        $response = $this->get('api/academic-periods/companies');

        // Verificar la respuesta
        $response->assertStatus(400);
        $response->assertJson([
            'message' => 'No esta inscrito en un periodo academico',
        ]);
    }

    /** @test */
    public function it_returns_not_found_if_no_companies_found()
    {
        // Crear un usuario autenticado con un periodo académico
        $user = User::factory()->create(['academic_period_id' => 1]);

        // Autenticarse usando Sanctum
        Sanctum::actingAs($user);

        // Realizar la solicitud
        $response = $this->get('api/academic-periods/companies');

        // Verificar la respuesta
        $response->assertStatus(404);
        $response->assertJson([
            'message' => 'No se encontraron compañías para el periodo académico especificado.'
        ]);
    }
}
