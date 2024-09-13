<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameColumnsInDocenteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('docente', function (Blueprint $table) {
            $table->renameColumn('nombre', 'first_name');
            $table->renameColumn('apellidos', 'last_name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('docente', function (Blueprint $table) {
            $table->renameColumn('first_name', 'nombre');
            $table->renameColumn('last_name', 'apellidos');
        });
    }
}
