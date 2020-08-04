<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id','name', 'description', 'address', 'phone_number', 'location', 'longitude', 'latitude', 'openingDays', 
        'openingHour', 'closingHour','isClosed', 'company_image'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'openingDays' => 'array',
    ];
    
    public function services (){
        return $this->hasMany('App\ProviderServices','id', 'company_id');
    }

    public function ratings (){
        return $this->hasMany('App\Rating','company_id', 'id');
    }
}
