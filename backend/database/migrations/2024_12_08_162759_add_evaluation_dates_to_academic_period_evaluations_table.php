<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddEvaluationDatesToAcademicPeriodEvaluationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('academic_period', function (Blueprint $table) {
            $table->date('evaluation_start_date');
            $table->date('evaluation_end_date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('academic_period', function (Blueprint $table) {
            $table->dropColumn(['evaluation_start_date', 'evaluation_end_date']);
        });
    }
}
