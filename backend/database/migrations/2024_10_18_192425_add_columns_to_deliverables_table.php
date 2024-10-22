<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToDeliverablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('deliverables', function (Blueprint $table) {
            $table->integer('expected_result')->nullable();
            $table->integer('actual_result')->nullable();
            $table->text('observations')->nullable()->default('Sin observaciones');
            $table->char('status', 1)->default('A')->comment('Status A (active), C (carry over)');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('deliverables', function (Blueprint $table) {
            $table->dropColumn(['expected_result', 'actual_result', 'observations', 'status']);
        });
    }
}
