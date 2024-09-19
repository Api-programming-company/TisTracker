<?php

namespace Tests\Feature\PeriodoAcademico;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Password;
use App\Models\User;
use Tests\TestCase;
use App\Models\AcademicPeriod;
use App\Models\EmailVerification;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmail;


//Docente
class AuthControllerDocenteTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function Solo_docente_puede_crear_periodoAcademico()
    {
        // Crear un usuario con tipo Estudiante "E"
        $estudiante = User::factory()->create(['user_type' => 'E']);
        $this->actingAs($estudiante);

        // Datos de prueba para el periodo académico
        $data = [
            'name' => 'Periodo 1',
            'start_date' => '2023-01-01',
            'end_date' => '2023-06-30',
            'description' => 'Descripción del periodo 1',
        ];

        // Enviar la solicitud para crear el periodo académico
        $response = $this->postJson('/api/docente/academic-periods', $data);

        // Verificar que la respuesta sea 403 (prohibido)
        $response->assertStatus(403);

        // Verificar que el periodo académico no fue creado en la base de datos
        $this->assertDatabaseMissing('academic_periods', [
            'name' => 'Periodo 1',
        ]);
    }


    /** @test */
    public function Docente_puede_crear_periodo_academico()
    {
        // Crear un usuario con tipo "D" (Docente)
        $docente = User::factory()->create(['user_type' => 'D']);
        $this->actingAs($docente);

        // Datos de prueba para el periodo académico
        $data = [
            'name' => 'Periodo 1',
            'start_date' => '2023-01-01',
            'end_date' => '2023-06-30',
            'description' => 'Descripción del periodo 1',
        ];

        // Enviar la solicitud para crear el periodo académico
        $response = $this->postJson('/api/docente/academic-periods', $data);

        // Imprimir la respuesta para depuración
        //dd($response->getContent());

        // Verificar que la respuesta sea 201 (creado)
        $response->assertStatus(201);

        // Verificar que el periodo académico fue creado en la base de datos
        $this->assertDatabaseHas('academic_periods', [
            'name' => 'Periodo 1',
            'start_date' => '2023-01-01',
            'end_date' => '2023-06-30',
            'description' => 'Descripción del periodo 1',
            'user_id' => $docente->id,
        ]);
    }




    //Campos obligatorios

    /** @test */
    public function nombre_obligatorio()
    {
        // Crear un usuario con tipo Estudiante "E"
        $estudiante = User::factory()->create(['user_type' => 'D']);
        $this->actingAs($estudiante);

        // Datos de prueba para el periodo académico
        $data = [
            'name' => '',
            'start_date' => '2023-01-01',
            'end_date' => '2023-06-30',
            'description' => 'Descripción del periodo 1',
        ];

        // Enviar la solicitud para crear el periodo académico
        $response = $this->postJson('/api/docente/academic-periods', $data);

        // Verificar que la respuesta sea 422 campo obligatorio
        $response->assertStatus(422);

        // Verificar que el periodo académico no fue creado en la base de datos
        $this->assertDatabaseMissing('academic_periods', [
            'name' => 'Periodo 1',
        ]);
    }

    /** @test */
    public function diaInicio_obligatorio()
    {
        // Crear un usuario con tipo Estudiante "E"
        $estudiante = User::factory()->create(['user_type' => 'D']);
        $this->actingAs($estudiante);

        // Datos de prueba para el periodo académico
        $data = [
            'name' => 'Periodo 1',
            'start_date' => '',
            'end_date' => '2023-06-30',
            'description' => 'Descripción del periodo 1',
        ];

        // Enviar la solicitud para crear el periodo académico
        $response = $this->postJson('/api/docente/academic-periods', $data);

        // Verificar que la respuesta sea 422 campo obligatorio
        $response->assertStatus(422);

        // Verificar que el periodo académico no fue creado en la base de datos
        $this->assertDatabaseMissing('academic_periods', [
            'name' => 'Periodo 1',
        ]);
    }

    /** @test */
    public function diaFin_obligatorio()
    {
        // Crear un usuario con tipo Estudiante "E"
        $estudiante = User::factory()->create(['user_type' => 'D']);
        $this->actingAs($estudiante);

        // Datos de prueba para el periodo académico
        $data = [
            'name' => 'Periodo 1',
            'start_date' => '2023-01-01',
            'end_date' => '',
            'description' => 'Descripción del periodo 1',
        ];

        // Enviar la solicitud para crear el periodo académico
        $response = $this->postJson('/api/docente/academic-periods', $data);

        // Verificar que la respuesta sea 422 campo obligatorio
        $response->assertStatus(422);

        // Verificar que el periodo académico no fue creado en la base de datos
        $this->assertDatabaseMissing('academic_periods', [
            'name' => 'Periodo 1',
        ]);
    }

    /** @test */
    public function fechas_en_orden()
    {
        // Crear un usuario con tipo Docente "D"
        $docente = User::factory()->create(['user_type' => 'D']);
        $this->actingAs($docente);

        // Datos de prueba para el periodo académico con fechas incorrectas
        $data = [
            'name' => 'Periodo 1',
            'start_date' => '2023-06-30',
            'end_date' => '2023-01-01',
            'description' => 'Descripción del periodo 1',
        ];

        // Enviar la solicitud para crear el periodo académico
        $response = $this->postJson('/api/docente/academic-periods', $data);

        // Verificar que la respuesta sea 422 (Unprocessable Entity)
        $response->assertStatus(422);

        // Verificar que el periodo académico no fue creado en la base de datos
        $this->assertDatabaseMissing('academic_periods', [
            'name' => 'Periodo 1',
        ]);
    }

    /** @test */
    public function nombre_de_periodo_academico_debe_ser_unico()
    {
        // Crear un usuario con tipo Docente "D"
        $docente = User::factory()->create(['user_type' => 'D']);
        $this->actingAs($docente);

        // Datos de prueba para el primer periodo académico
        $data1 = [
            'name' => 'Periodo Unico',
            'start_date' => '2023-01-01',
            'end_date' => '2023-06-30',
            'description' => 'Descripción del primer periodo',
        ];

        // Enviar la solicitud para crear el primer periodo académico
        $response1 = $this->postJson('/api/docente/academic-periods', $data1);

        // Verificar que la respuesta sea 201 (Created)
        $response1->assertStatus(201);

        // Datos de prueba para el segundo periodo académico con el mismo nombre
        $data2 = [
            'name' => 'Periodo Unico',
            'start_date' => '2023-07-01',
            'end_date' => '2023-12-31',
            'description' => 'Descripción del segundo periodo',
        ];

        // Enviar la solicitud para crear el segundo periodo académico
        $response2 = $this->postJson('/api/docente/academic-periods', $data2);

        // Verificar que la respuesta sea 422 (Unprocessable Entity) debido a la duplicidad del nombre
        $response2->assertStatus(422);

        // Verificar que solo el primer periodo académico fue creado en la base de datos
        $this->assertDatabaseHas('academic_periods', [
            'name' => 'Periodo Unico',
            'start_date' => '2023-01-01',
            'end_date' => '2023-06-30',
        ]);

        $this->assertDatabaseMissing('academic_periods', [
            'name' => 'Periodo Unico',
            'start_date' => '2023-07-01',
            'end_date' => '2023-12-31',
        ]);
    }
}