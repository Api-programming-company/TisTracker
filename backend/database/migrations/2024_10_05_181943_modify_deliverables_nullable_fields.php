<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyDeliverablesNullableFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('deliverables', function (Blueprint $table) {
            // Modificar las columnas existentes para permitir valores nulos
            $table->string('responsible')->nullable()->change();
            $table->text('objective')->nullable()->change();
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
            // Revertir los cambios si es necesario (volver a no permitir null)
            $table->string('responsible')->nullable(false)->change();
            $table->text('objective')->nullable(false)->change();
        });
    }
}
