<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Fillup extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id','car_id','fill_date','odometer','quantity','price','totalcost','fillingstation',
        'notes','distanceInKm','distanceInMl','kml_number','mpg_number'
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

    public function car (){
        return $this->belongsTo('App\CarProfile','id', 'car_id');
    }
    
    public function user (){
        return $this->belongsTo('App\User','id', 'user_id');
    }
}
