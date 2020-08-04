<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Str;

class ApiTokenController extends Controller
{
    static function update(User $user)
    {
        $token = Str::random(80);
        $user->forceFill([
            'api_token' => $token, // This should be hashed, but for the sake of testing, its not
        ])->save();
        return $token;
    }
}

?>