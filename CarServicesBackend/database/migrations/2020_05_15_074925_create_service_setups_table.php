<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServiceSetupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('service_setups', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name',30);
            $table->string('service_icon',30);
            $table->string('icon_library',30);
            $table->timestamps();
        });
        DB::table('service_setups')->insert(
            array(
                'name' => 'Fuel'
            ),
            array(
                'name' => 'Car Wash'
            ),
            array(
                'name' => 'Others'
            ),
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('service_setups');
    }
}
