<?php

namespace App\Role;

use Illuminate\Database\Eloquent\Model;
use App\User;

class RoleChecker extends Model
{
        /**
     * @param User $user
     * @param string $role
     * @return bool
     */
    public function check(User $user, string $role)
    {
        if ($user->hasRole(UserRole::ROLE_ADMIN)) {
            return true;
        }

        return $user->hasRole($role);
    }
}
