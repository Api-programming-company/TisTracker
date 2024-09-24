<?php

namespace Tests\Feature;

use App\Models\Planning;
use App\Models\Company;
use App\Models\Milestone;
use App\Models\Deliverable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PlanningTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_register_different_milestones()
    {
        $company = Company::factory()->create(); // Crear una compañía

        $planningData = [
            'name' => 'Planning Test',
            'company_id' => $company->id,
            'milestones' => [
                [
                    'name' => 'Milestone 1',
                    'start_date' => '2024-09-01',
                    'end_date' => '2024-09-10',
                    'billing_percentage' => 30,
                    'deliverables' => [
                        ['name' => 'Deliverable 1', 'responsible' => 'User 1', 'objective' => 'Objective 1'],
                    ],
                ],
                [
                    'name' => 'Milestone 2',
                    'start_date' => '2024-09-11',
                    'end_date' => '2024-09-20',
                    'billing_percentage' => 70,
                    'deliverables' => [
                        ['name' => 'Deliverable 2', 'responsible' => 'User 2', 'objective' => 'Objective 2'],
                    ],
                ],
            ],
        ];

        $response = $this->postJson('/api/plannings', $planningData);

        $response->assertStatus(201);
        $this->assertCount(2, Planning::first()->milestones);
    }

    public function test_required_fields_for_milestones()
    {
        $company = Company::factory()->create();

        $response = $this->postJson('/api/plannings', [
            'name' => 'Planning Test',
            'company_id' => $company->id,
            'milestones' => [
                ['name' => 'Milestone 1'], // Missing required fields
            ]
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['milestones.0.start_date', 'milestones.0.end_date', 'milestones.0.billing_percentage']);
    }

    public function test_end_date_must_be_after_start_date()
    {
        $company = Company::factory()->create();

        $planningData = [
            'name' => 'Planning Test',
            'company_id' => $company->id,
            'milestones' => [
                [
                    'name' => 'Milestone 1',
                    'start_date' => '2024-09-10',
                    'end_date' => '2024-09-01', // Invalid end date
                    'billing_percentage' => 30,
                    'deliverables' => [
                        ['name' => 'Deliverable 1', 'responsible' => 'User 1', 'objective' => 'Objective 1'],
                    ],
                ],
            ],
        ];

        $response = $this->postJson('/api/plannings', $planningData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['milestones.0.end_date']);
    }

    public function test_final_milestone_end_date_must_be_before_final_delivery()
    {
        $company = Company::factory()->create();

        $planningData = [
            'name' => 'Planning Test',
            'company_id' => $company->id,
            'milestones' => [
                [
                    'name' => 'Milestone 1',
                    'start_date' => '2024-09-01',
                    'end_date' => '2024-09-15', // Valid
                    'billing_percentage' => 30,
                    'deliverables' => [
                        ['name' => 'Deliverable 1', 'responsible' => 'User 1', 'objective' => 'Objective 1'],
                    ],
                ],
                [
                    'name' => 'Milestone 2',
                    'start_date' => '2024-09-16',
                    'end_date' => '2024-09-20', // Invalid if final delivery is 2024-09-15
                    'billing_percentage' => 70,
                    'deliverables' => [
                        ['name' => 'Deliverable 2', 'responsible' => 'User 2', 'objective' => 'Objective 2'],
                    ],
                ],
            ],
        ];

        $response = $this->postJson('/api/plannings', $planningData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['milestones.1.end_date']);
    }

    public function test_each_milestone_has_at_least_one_deliverable()
    {
        $company = Company::factory()->create();

        $planningData = [
            'name' => 'Planning Test',
            'company_id' => $company->id,
            'milestones' => [
                [
                    'name' => 'Milestone 1',
                    'start_date' => '2024-09-01',
                    'end_date' => '2024-09-10',
                    'billing_percentage' => 30,
                    'deliverables' => [], // No deliverables
                ],
            ],
        ];

        $response = $this->postJson('/api/plannings', $planningData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['milestones.0.deliverables']);
    }

    public function test_deliverable_name_length_constraints()
    {
        $company = Company::factory()->create();

        $planningData = [
            'name' => 'Planning Test',
            'company_id' => $company->id,
            'milestones' => [
                [
                    'name' => 'Milestone 1',
                    'start_date' => '2024-09-01',
                    'end_date' => '2024-09-10',
                    'billing_percentage' => 30,
                    'deliverables' => [
                        ['name' => 'Short', 'responsible' => 'User 1', 'objective' => 'Objective 1'], // Invalid name (too short)
                        ['name' => str_repeat('a', 33), 'responsible' => 'User 2', 'objective' => 'Objective 2'], // Invalid name (too long)
                    ],
                ],
            ],
        ];

        $response = $this->postJson('/api/plannings', $planningData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['milestones.0.deliverables.0.name', 'milestones.0.deliverables.1.name']);
    }

    public function test_positive_integer_for_billing_percentage()
    {
        $company = Company::factory()->create();

        $planningData = [
            'name' => 'Planning Test',
            'company_id' => $company->id,
            'milestones' => [
                [
                    'name' => 'Milestone 1',
                    'start_date' => '2024-09-01',
                    'end_date' => '2024-09-10',
                    'billing_percentage' => -20, // Invalid billing percentage
                    'deliverables' => [
                        ['name' => 'Deliverable 1', 'responsible' => 'User 1', 'objective' => 'Objective 1'],
                    ],
                ],
            ],
        ];

        $response = $this->postJson('/api/plannings', $planningData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['milestones.0.billing_percentage']);
    }

    public function test_total_percentage_cannot_exceed_100()
    {
        $company = Company::factory()->create();

        $planningData = [
            'name' => 'Planning Test',
            'company_id' => $company->id,
            'milestones' => [
                [
                    'name' => 'Milestone 1',
                    'start_date' => '2024-09-01',
                    'end_date' => '2024-09-10',
                    'billing_percentage' => 70,
                    'deliverables' => [
                        ['name' => 'Deliverable 1', 'responsible' => 'User 1', 'objective' => 'Objective 1'],
                    ],
                ],
                [
                    'name' => 'Milestone 2',
                    'start_date' => '2024-09-11',
                    'end_date' => '2024-09-20',
                    'billing_percentage' => 40, // Total would exceed 100
                    'deliverables' => [
                        ['name' => 'Deliverable 2', 'responsible' => 'User 2', 'objective' => 'Objective 2'],
                    ],
                ],
            ],
        ];

        $response = $this->postJson('/api/plannings', $planningData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['milestones']);
    }

    public function test_group_representative_cannot_submit_planning_more_than_once()
    {
        $company = Company::factory()->create();

        $planningData = [
            'name' => 'Planning Test',
            'company_id' => $company->id,
            'milestones' => [
                [
                    'name' => 'Milestone 1',
                    'start_date' => '2024-09-01',
                    'end_date' => '2024-09-10',
                    'billing_percentage' => 30,
                    'deliverables' => [
                        ['name' => 'Deliverable 1', 'responsible' => 'User 1', 'objective' => 'Objective 1'],
                    ],
                ],
            ],
        ];

        // First submission
        $response = $this->postJson('/api/plannings', $planningData);
        $response->assertStatus(201);

        // Second submission (should fail)
        $response = $this->postJson('/api/plannings', $planningData);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['company_id']); // Assuming the validation checks for existing planning
    }

    public function test_company_id_must_exist()
    {
        $planningData = [
            'name' => 'Planning Test',
            'company_id' => 99999, // Non-existing company
            'milestones' => [
                [
                    'name' => 'Milestone 1',
                    'start_date' => '2024-09-01',
                    'end_date' => '2024-09-10',
                    'billing_percentage' => 30,
                    'deliverables' => [
                        ['name' => 'Deliverable 1', 'responsible' => 'User 1', 'objective' => 'Objective 1'],
                    ],
                ],
            ],
        ];

        $response = $this->postJson('/api/plannings', $planningData);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['company_id']);
    }
}
