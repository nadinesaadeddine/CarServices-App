<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProviderServices extends Model
{
      /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        	'service_id', 'company_id', 'description', 'fromprice', 'toprice',
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

    protected $table = 'provider_services';

    public function companies (){
        return $this->hasOne('App\Company','id','company_id');
    }

    public function services (){
        return $this->hasOne('App\ServiceSetup');
    }
}
