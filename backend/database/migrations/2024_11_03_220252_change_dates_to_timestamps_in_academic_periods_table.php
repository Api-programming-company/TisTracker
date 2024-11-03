<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeDatesToTimestampsInAcademicPeriodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('academic_periods', function (Blueprint $table) {
            // Cambiamos los tipos de datos de `date` a `timestamp`
            $table->datetime('start_date')->change();
            $table->datetime('end_date')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('academic_periods', function (Blueprint $table) {
            // Revertimos los cambios a `date` en caso de rollback
            $table->date('start_date')->change();
            $table->date('end_date')->change();
        });
    }
}
