<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFillupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
   
    public function up()
    {
        Schema::create('fillups', function (Blueprint $table) {
            $table->bigIncrements('id'); 
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('car_id');
            $table->date('fill_date');    
            $table->double('odometer');
            $table->double('quantity');
            $table->double('price');
            $table->double('totalcost');
            $table->string('fillingstation');
            $table->text('notes')->nullable();
            $table->double('distanceInKm')->nullable();
            $table->double('distanceInMl')->nullable();
            $table->double('kml_number')->nullable();
            $table->double('mpg_number')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')
                ->onDelete('cascade')->onUpdate('cascade'); 
            $table->foreign('car_id')->references('id')->on('car_profiles')
                ->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fillups');
    }
}
