<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserEvaluationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_evaluations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('evaluator_company_user_id')->constrained('company_user')->onDelete('cascade');  // Miembro de empresa que evalúa
            $table->foreignId('evaluatee_company_user_id')->constrained('company_user')->onDelete('cascade');  // Miembro de empresa evaluado
            $table->integer('score');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_evaluations');
    }
}
