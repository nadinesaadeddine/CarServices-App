<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
      /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'userservice_id','company_id','user_id', 'rating_value'
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

    public function company (){
        return $this->belongsTo('App\Company','company_id', 'id');
    }

    public function user (){
        return $this->belongsTo('App\User','user_id', 'id');
    }

    public function userservice (){
        return $this->belongsTo('App\UserServices','userservice_id', 'id');
    }

}
