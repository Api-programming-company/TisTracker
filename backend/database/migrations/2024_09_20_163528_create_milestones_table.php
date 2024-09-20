<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMilestonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('milestones', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nombre del hito
            $table->date('start_date'); // Fecha de inicio
            $table->date('end_date'); // Fecha de fin
            $table->decimal('billing_percentage', 5, 2); // Porcentaje de cobro
            $table->unsignedBigInteger('planning_id'); // Relación con la tabla Planning
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('planning_id')->references('id')->on('plannings')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('milestones');
    }
}
