<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeliverablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deliverables', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('responsible')->nullable();
            $table->text('objective')->nullable();
            $table->unsignedBigInteger('milestone_id');
            $table->integer('expected_result')->nullable();
            $table->integer('actual_result')->nullable();
            $table->text('observations')->nullable()->default('Sin observaciones');
            $table->char('status', 1)->default('A')->comment('Status A (active), C (carry over)');        
            $table->timestamps();

            $table->foreign('milestone_id')->references('id')->on('milestones')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deliverables');
    }
}
