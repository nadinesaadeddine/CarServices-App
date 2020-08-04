<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_services', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('service_id');
            $table->unsignedBigInteger('company_id');
            $table->unsignedBigInteger('user_id');
            $table->date('booking_date');
            $table->time('booking_time');
            $table->tinyInteger('booking_now')->default(0);
            $table->double('price');
            $table->text('notes');
            $table->string('status',10);
            $table->unsignedBigInteger('car_id')->nullable();
            $table->string('book_address');
            $table->string('location')->nullable();
            $table->double('longitude')->nullable();
            $table->double('latitude')->nullable();
            $table->tinyInteger('status_level')->default(0);
            $table->tinyInteger('isDone')->default(0);
            $table->date('done_date')->nullable();
            $table->time('done_time')->nullable();
            $table->timestamps();

            $table->foreign('service_id')->references('id')->on('service_setups')
                ->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('company_id')->references('id')->on('companies')
                ->onDelete('cascade')->onUpdate('cascade');  
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
        Schema::dropIfExists('user_services');
    }
}
