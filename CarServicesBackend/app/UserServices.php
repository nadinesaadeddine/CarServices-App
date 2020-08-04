<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserServices extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'service_id','company_id','user_id','booking_date','booking_time','booking_now','price','notes','book_address','status',
        'car_id', 'location', 'longitude', 'latitude', 'status_level', 'isDone', 'done_date', 'done_time'
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

    protected $table = 'user_services';

    public function service (){
        return $this->hasOne('App\ServiceSetup','id', 'service_id');
    }

    public function company (){
        return $this->hasOne('App\Company','id', 'company_id');
    }

    public function car (){
        return $this->hasOne('App\CarProfile','id', 'service_id');
    }

    public function user (){
        return $this->hasOne('App\User','id', 'user_id');
    }
    public function rating (){
        return $this->hasOne('App\Rating', 'userservice_id', 'id');
    }
    
}
