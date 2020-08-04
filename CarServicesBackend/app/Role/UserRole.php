<?php

namespace App\Role;

use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    const ROLE_PROVIDER = 'ROLE_PROVIDER';
    const ROLE_USER = 'ROLE_USER';

    /***
     * @return array
     */
    public static function getRoleList()
    {
        return [
            static::ROLE_PROVIDER =>'Provider',
            static::ROLE_USER => 'User',
        ];
    }
}
