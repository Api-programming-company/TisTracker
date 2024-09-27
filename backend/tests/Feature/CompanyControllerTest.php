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
    /** @test */
    public function it_creates_a_company_with_valid_academic_period()
    {
        // Create a user and authenticate with Sanctum
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        // Create a valid academic period
        $academicPeriod = AcademicPeriod::factory()->create();

        // Define the company data with a valid academic period
        $data = [
            'long_name' => 'Test Company',
            'short_name' => 'TC',
            'email' => 'testcompany@example.com',
            'address' => '123 Test St',
            'phone' => '12345678',
            'academic_period_id' => $academicPeriod->id,
        ];

        // Make a POST request to create the company via the API
        $response = $this->post('api/company', $data);

        // Assert the company was created successfully
        $response->assertStatus(201);

        // Assert the company exists in the database
        $this->assertDatabaseHas('companies', ['email' => $data['email']]);

        // Fetch the newly created company
        $company = Company::where('email', $data['email'])->first();

        // Assert the company has a valid academic period
        $this->assertInstanceOf(AcademicPeriod::class, $company->academicPeriod);

        // Assert that the company does not have a planning associated
        $this->assertNull($company->planning);

        // Ensure no planning entry exists in the database for this company
        $this->assertDatabaseMissing('plannings', ['company_id' => $company->id]);
    }

    /** @test */
    public function it_returns_error_when_academic_period_is_invalid()
    {
        // Create a user without an academic period and authenticate with Sanctum
        $user = User::factory()->create(['academic_period_id' => null]);
        Sanctum::actingAs($user);

        // Define company data without an academic period
        $data = [
            'long_name' => 'Another Company',
            'short_name' => 'name',
            'email' => 'another@example.com',
            'address' => '456 Another St',
            'phone' => '12345678',
            'academic_period_id' => 9999, // Invalid academic period ID
        ];

        // Make a POST request to create the company via the API
        $response = $this->post('api/company', $data);

        // Assert that a 404 error is returned
        $response->assertStatus(404);

        // Assert the correct error message is returned
        $response->assertJson([
            'message' => 'The associated academic period does not exist.'
        ]);
    }

    public function it_validates_company_status_after_creation()
    {
        // Create a user and authenticate with Sanctum
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        // Create a valid academic period
        $academicPeriod = AcademicPeriod::factory()->create();

        // Define the company data with a valid academic period
        $data = [
            'long_name' => 'Test Company',
            'short_name' => 'TC',
            'email' => 'testcompany@example.com',
            'address' => '123 Test St',
            'phone' => '12345678',
            'academic_period_id' => $academicPeriod->id,
        ];

        // Make a POST request to create the company via the API
        $response = $this->post('api/company', $data);

        // Assert the company was created successfully
        $response->assertStatus(201);

        // Fetch the newly created company
        $company = Company::where('email', $data['email'])->first();

        // Assert that the company's status is 'C'
        $this->assertEquals('C', $company->status);
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

        // Realizar la solicitud GET, incluyendo el ID del período académico en la URL
        $response = $this->get('api/academic-periods/companies?id=' . $academicPeriod->id);

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

        // Crear un periodo académico para enviar en la solicitud
        $academicPeriod = AcademicPeriod::factory()->create();

        // Realizar la solicitud con el ID del periodo académico
        $response = $this->get('api/academic-periods/companies?id=' . $academicPeriod->id);

        // Verificar la respuesta
        $response->assertStatus(400);
        $response->assertJson([
            'message' => 'No está inscrito en un periodo académico.',
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
