<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SimonRouteTest extends TestCase
{
    /**
     * Test the /simon route.
     *
     * @return void
     */
    public function test_simon_route_returns_correct_json()
    {
        $response = $this->get('/api/simon');

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'hola simon',
                 ]);
    }
}
