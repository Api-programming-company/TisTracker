<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Eliminar la columna 'name'
            $table->dropColumn('name');
            
            // Agregar las nuevas columnas 'first_name' y 'last_name'
            $table->string('first_name')->after('id');
            $table->string('last_name')->after('first_name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Restaurar la columna 'name'
            $table->string('name')->after('id');
            
            // Eliminar las columnas 'first_name' y 'last_name'
            $table->dropColumn(['first_name', 'last_name']);
        });
    }
}
