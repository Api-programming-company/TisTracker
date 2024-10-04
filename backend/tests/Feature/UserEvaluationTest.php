<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Laravel\Sanctum\Sanctum;
use App\Models\User;

class UserEvaluationTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_create_user_evaluation()
    {
        $evaluator = User::factory()->create();
        $evaluatee = User::factory()->create();

        // Sin autenticación
        $response = $this->postJson('/user-evaluations', [
            'evaluatee_id' => $evaluatee->id,
            'score' => 85,
        ]);

        $response->assertStatus(401); // No autorizado
    }


    public function test_it_can_create_user_evaluation()
    {
        $evaluator = User::factory()->create();
        $evaluatee = User::factory()->create();

        Sanctum::actingAs($evaluator);

        $response = $this->postJson('/user-evaluations', [
            'evaluatee_id' => $evaluatee->id,
            'score' => 85,
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'evaluatee_id' => $evaluatee->id,
                'score' => 85,
            ]);

        $this->assertDatabaseHas('user_evaluations', [
            'evaluator_id' => $evaluator->id,
            'evaluatee_id' => $evaluatee->id,
            'score' => 85,
        ]);
    }

    public function test_user_evaluation_fails_when_score_is_greater_than_100()
    {
        $evaluator = User::factory()->create();
        $evaluatee = User::factory()->create();

        Sanctum::actingAs($evaluator);

        $response = $this->postJson('/user-evaluations', [
            'evaluatee_id' => $evaluatee->id,
            'score' => 110,  // Puntuación inválida
        ]);

        $response->assertStatus(422);  // Error de validación
        $response->assertJsonValidationErrors(['score']);
    }

    public function test_user_evaluation_fails_when_score_is_less_than_0()
    {
        $evaluator = User::factory()->create();
        $evaluatee = User::factory()->create();

        Sanctum::actingAs($evaluator);

        $response = $this->postJson('/user-evaluations', [
            'evaluatee_id' => $evaluatee->id,
            'score' => -5,  // Puntuación inválida
        ]);

        $response->assertStatus(422);  // Error de validación
        $response->assertJsonValidationErrors(['score']);
    }

}
