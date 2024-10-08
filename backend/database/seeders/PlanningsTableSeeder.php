<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Planning;
use Carbon\Carbon;
class PlanningsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Planning::create([
            'id' => 1,
            'name' => 'Planificación 1',
            'company_id' => 1, // Company A
            'created_at' => Carbon::now(), 
            'updated_at' => Carbon::now(), 
        ]);

        Planning::create([
            'id' => 2,
            'name' => 'Planificación 2',
            'company_id' => 2, // Company B
            'created_at' => Carbon::now(), 
            'updated_at' => Carbon::now(), 
        ]);
    }
}
