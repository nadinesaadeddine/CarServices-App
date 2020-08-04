<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AddressBook extends Model
{
      /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'location', 'longitude', 'latitude', 'house_no', 'building_name', 'street_name', 'extra_notes', 'saved_as'
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

    protected $table = 'address_books';
}
