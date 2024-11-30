<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDatesToAcademicPeriodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('academic_periods', function (Blueprint $table) {
            $table->date('company_creation_start_date')->nullable();
            $table->date('company_creation_end_date')->nullable();
            $table->date('planning_start_date')->nullable();
            $table->date('planning_end_date')->nullable();
        });
    }

    public function down()
    {
        Schema::table('academic_periods', function (Blueprint $table) {
            $table->dropColumn([
                'company_creation_start_date',
                'company_creation_end_date',
                'planning_start_date',
                'planning_end_date',
            ]);
        });
    }

}
