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
use Laravel\Sanctum\Sanctum;

//Docente
class UnirseGrupoTisTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function retorne_correctamente_los_periodos_académicos_agrupados_por_docente()
    {
        $teacher1 = User::factory()->create([
            'first_name' => 'Teacher',
            'last_name' => 'One',
            'email' => 'teacher1@example.com',
            'user_type' => 'D',
        ]);

        $teacher2 = User::factory()->create([
            'first_name' => 'Teacher',
            'last_name' => 'Two',
            'email' => 'teacher2@example.com',
            'user_type' => 'D',
        ]);

        // Crear periodos académicos
        AcademicPeriod::factory()->create([
            'name' => 'Fall Semester 2024',
            'start_date' => '2024-09-01',
            'end_date' => '2024-12-15',
            'user_id' => $teacher1->getAttribute('id'),
        ]);

        AcademicPeriod::factory()->create([
            'name' => 'Spring Semester 2024',
            'start_date' => '2024-02-01',
            'end_date' => '2024-06-30',
            'user_id' => $teacher2->getAttribute('id'),
        ]);

        // Autenticar como un docente usando Sanctum
        Sanctum::actingAs($teacher1);

        // Hacer la solicitud a la ruta que agrupa los periodos por docentes
        $response = $this->getJson('/api/academic-periods/grouped-by-teacher');

        // Verificar que la respuesta tenga la estructura esperada
        $response->assertStatus(200)
            ->assertJson([
                [
                    'teacher_name' => 'Teacher One',
                    'teacher_email' => 'teacher1@example.com',
                    'academic_periods' => [
                        [
                            'name' => 'Fall Semester 2024',
                            'start_date' => '2024-09-01',
                            'end_date' => '2024-12-15',
                        ]
                    ]
                ],
                [
                    'teacher_name' => 'Teacher Two',
                    'teacher_email' => 'teacher2@example.com',
                    'academic_periods' => [
                        [
                            'name' => 'Spring Semester 2024',
                            'start_date' => '2024-02-01',
                            'end_date' => '2024-06-30',
                        ]
                    ]
                ]
            ]);
    }
    /** @test */
    public function los_docentes_no_pueden_incribirce_a_un_Grupo_Tis() //good
    {
        $teacher = User::factory()->create(['user_type' => 'D']);
        $academicPeriod = AcademicPeriod::factory()->create(['user_id' => $teacher->id]);

        Sanctum::actingAs($teacher);
        $response = $this->postJson('/api/academic-periods/enroll', [
            'academic_period_id' => $academicPeriod->getAttribute('id'),
        ]);

        $response->assertStatus(403)
            ->assertJson(['message' => 'Solo estudiantes pueden inscribirse.']);
    }

    /** @test */
    public function Solo_los_estudiantes_pueden_unierse_Grupo_tis()
    {
        $student = User::factory()->create(['user_type' => 'E']);
        $academicPeriod1 = AcademicPeriod::factory()->create();
        $academicPeriod2 = AcademicPeriod::factory()->create();

        // Enroll the student in the first academic period
        Sanctum::actingAs($student);
        $response1 = $this->postJson('/api/academic-periods/enroll', [
            'academic_period_id' => $academicPeriod1->getAttribute('id'),
        ]);

        $response1->assertStatus(200)
            ->assertJson(['message' => 'Se inscribió correctamente en el periodo académico']);

        // Attempt to enroll in another academic period
        
        $response2 = $this->postJson('/api/academic-periods/enroll', [
            'academic_period_id' => $academicPeriod2->getAttribute('id'),
        ]);

        $response2->assertStatus(400)
            ->assertJson(['message' => 'Ya está inscrito en un periodo académico']);
    }

    /** @test */
    public function estudiante_no_se_puede_inscribir_Grupo_tis_inexistente()
    {
        $student = User::factory()->create(['user_type' => 'E']);
        Sanctum::actingAs($student);
        $response = $this->postJson('/api/academic-periods/enroll', [
            'academic_period_id' => 9999, // Nonexistent ID
        ]);

        $response->assertStatus(404);
    }
}
