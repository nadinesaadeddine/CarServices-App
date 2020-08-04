<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('car_profiles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->string('car_make',50);
            $table->string('car_model',50)->nullable();
            $table->string('fuel_type',10)->nullable();
            $table->string('year',4)->nullable();
            $table->string('license_number',20)->nullable();
            $table->string('insurance_no',20)->nullable();
            $table->text('extra_notes')->nullable();
            $table->tinyInteger('default_car')->default(0); 
            $table->string('car_image')->nullable();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')
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
        Schema::dropIfExists('car_profiles');
    }
}
