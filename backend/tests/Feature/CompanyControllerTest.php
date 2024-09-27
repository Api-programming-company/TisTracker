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
    public function it_creates_a_company_with_valid_data()
    {
        // Crear un usuario autenticado
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        // Crear un periodo académico
        $academicPeriod = AcademicPeriod::factory()->create();

        // Definir los datos de la compañía con un periodo académico válido
        $data = [
            'long_name' => 'Test Company',
            'short_name' => 'TC',
            'email' => 'testcompany@example.com',
            'address' => '123 Test St',
            'phone' => '12345678',
            'academic_period_id' => $academicPeriod->id,
        ];

        // Realizar una solicitud POST para crear la compañía
        $response = $this->post('api/company', $data);

        // Afirmar que la compañía fue creada exitosamente
        $response->assertStatus(201);
    }

    /** @test */
    public function it_saves_company_in_database()
    {
        // Crear un usuario autenticado
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        // Crear un periodo académico
        $academicPeriod = AcademicPeriod::factory()->create();

        // Definir los datos de la compañía
        $data = [
            'long_name' => 'Test Company',
            'short_name' => 'TC',
            'email' => 'testcompany@example.com',
            'address' => '123 Test St',
            'phone' => '12345678',
            'academic_period_id' => $academicPeriod->id,
        ];

        // Crear la compañía
        $this->post('api/company', $data);

        // Afirmar que la compañía existe en la base de datos
        $this->assertDatabaseHas('companies', ['email' => $data['email']]);
    }

    /** @test */
    public function it_has_valid_academic_period_association()
    {
        // Crear un usuario autenticado
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        // Crear un periodo académico
        $academicPeriod = AcademicPeriod::factory()->create();

        // Definir los datos de la compañía
        $data = [
            'long_name' => 'Test Company',
            'short_name' => 'TC',
            'email' => 'testcompany@example.com',
            'address' => '123 Test St',
            'phone' => '12345678',
            'academic_period_id' => $academicPeriod->id,
        ];

        // Crear la compañía
        $this->post('api/company', $data);

        // Obtener la compañía creada
        $company = Company::where('email', $data['email'])->first();

        // Afirmar que la compañía tiene un periodo académico válido
        $this->assertInstanceOf(AcademicPeriod::class, $company->academicPeriod);
    }

    /** @test */
    public function it_does_not_have_associated_planning()
    {
        // Crear un usuario autenticado
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        // Crear un periodo académico
        $academicPeriod = AcademicPeriod::factory()->create();

        // Definir los datos de la compañía
        $data = [
            'long_name' => 'Test Company',
            'short_name' => 'TC',
            'email' => 'testcompany@example.com',
            'address' => '123 Test St',
            'phone' => '12345678',
            'academic_period_id' => $academicPeriod->id,
        ];

        // Crear la compañía
        $this->post('api/company', $data);

        // Obtener la compañía creada
        $company = Company::where('email', $data['email'])->first();

        // Afirmar que la compañía no tiene planificación asociada
        $this->assertNull($company->planning);

        // Afirmar que no existe entrada de planificación en la base de datos para esta compañía
        $this->assertDatabaseMissing('plannings', ['company_id' => $company->id]);
    }

    /** @test */
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
        $response->assertStatus(403);
        $response->assertJson([
            'message' => 'No tienes permiso para ver las compañías de este periodo académico.',
        ]);
    }


    /** @test */
    public function it_returns_empty_list_if_no_companies_found()
    {
        // Crear un periodo académico
        $academicPeriod = AcademicPeriod::factory()->create(['id' => 1]);

        // Crear un usuario autenticado con el periodo académico
        $user = User::factory()->create(['academic_period_id' => $academicPeriod->id]);

        // Autenticarse usando Sanctum
        Sanctum::actingAs($user);

        // Realizar la solicitud con el ID del periodo académico
        $response = $this->get('api/academic-periods/companies?id=' . $academicPeriod->id);

        // Verificar la respuesta
        $response->assertStatus(200); // Esperamos un 200 OK
        $response->assertJson([
            'message' => 'Compañías obtenidas correctamente.',
            'companies' => [] // Aseguramos que la lista de compañías esté vacía
        ]);
    }
}
