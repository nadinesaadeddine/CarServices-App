<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CarProfile extends Model
{
       /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'car_make', 'car_model', 'fuel_type', 'year', 'license_number', 'insurance_no', 'extra_notes', 'default_car', 'car_image'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [];

    protected $table = 'car_profiles';
}
