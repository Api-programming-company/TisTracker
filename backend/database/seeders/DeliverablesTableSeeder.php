<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Deliverable;
use Carbon\Carbon;
class DeliverablesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Deliverable::create([
            'id' => 1,
            'name' => 'Entregable 1',
            'responsible' => 'User 1',
            'objective' => 'Completar la fase inicial',
            'milestone_id' => 1, // Hito 1
            'created_at' => Carbon::now(), 
            'updated_at' => Carbon::now(), 
        ]);

        Deliverable::create([
            'id' => 2,
            'name' => 'Entregable 2',
            'responsible' => 'User 2',
            'objective' => 'Revisar avances',
            'milestone_id' => 2, // Hito 2
            'created_at' => Carbon::now(), 
            'updated_at' => Carbon::now(), 
        ]);
    }
}
