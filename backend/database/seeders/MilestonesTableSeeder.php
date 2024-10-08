<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Milestone;
use Carbon\Carbon;
class MilestonesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Milestone::create([
            'id' => 1,
            'name' => 'Hito 1',
            'start_date' => '2024-01-01',
            'end_date' => '2024-03-31',
            'billing_percentage' => 70,
            'planning_id' => 1, // Planificación 1
            'created_at' => Carbon::now(), 
            'updated_at' => Carbon::now(), 
        ]);

        Milestone::create([
            'id' => 2,
            'name' => 'Hito 2',
            'start_date' => '2024-04-01',
            'end_date' => '2024-06-30',
            'billing_percentage' => 55,
            'planning_id' => 1, // Planificación 1
            'created_at' => Carbon::now(), 
            'updated_at' => Carbon::now(), 
        ]);

        Milestone::create([
            'id' => 3,
            'name' => 'Hito 1.2',
            'start_date' => '2024-01-01',
            'end_date' => '2024-03-31',
            'billing_percentage' => 31,
            'planning_id' => 2, // Planificación 2
            'created_at' => Carbon::now(), 
            'updated_at' => Carbon::now(), 
        ]);

        Milestone::create([
            'id' => 4,
            'name' => 'Hito 2.2',
            'start_date' => '2024-04-01',
            'end_date' => '2024-06-30',
            'billing_percentage' => 65,
            'planning_id' => 2, // Planificación 2
            'created_at' => Carbon::now(), 
            'updated_at' => Carbon::now(), 
        ]);
    }
}
