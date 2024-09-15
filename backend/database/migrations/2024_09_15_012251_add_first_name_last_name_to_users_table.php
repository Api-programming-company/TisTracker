<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFirstNameLastNameToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('first_name')->after('id');  // Agregar campo first_name
            $table->string('last_name')->after('first_name');  // Agregar campo last_name
            $table->dropColumn('name');  // Eliminar campo name
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
            $table->string('name')->after('id');  // Restaurar campo name
            $table->dropColumn('first_name');  // Eliminar campo first_name
            $table->dropColumn('last_name');  // Eliminar campo last_name
        });
    }
}
