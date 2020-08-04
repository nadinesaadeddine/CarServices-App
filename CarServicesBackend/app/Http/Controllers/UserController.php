<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use App\User;
use App\Role\UserRole;


class UserController extends ApiBaseController
{
    public function login(){
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        if(Auth::attempt(['email' => $data['email'], 'password' => $data['password']])){
            $user = Auth::user();
            $token = ApiTokenController::update($user);

            if($user->hasRole(UserRole::ROLE_USER)) $role = 'user';
            if($user->hasRole(UserRole::ROLE_PROVIDER)) $role = 'provider';

            $result = ['token' => $token,
                        'user_id' => $user->id,
                        'role' => $role
                    ];
            return $this->sendResponse($result, 'Login success');
        }
        else{
            return $this->sendError('Invalid Credentials');
        }
    }

    protected function create (){
        $input = file_get_contents('php://input');
        $data = json_decode($input, true); 
        
        $user = User::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]); 
        if($data['role'] == 'user') $user->addRole(UserRole::ROLE_USER);
        if($data['role'] == 'provider') $user->addRole(UserRole::ROLE_PROVIDER);
       
        if (!$user->save())  
            return $this->sendError('could not Save User', [], 202); 

        $token = ApiTokenController::update($user);    
        $result = ['token' => $token,
                    'user_id' => $user->id,
                    'role' => $data['role']
                ];
        return $this->sendResponse($result, 'Register success');
    }

    public function update(Request $request){
        try {
           // $input = file_get_contents('php://input');
            $data = json_decode($request->getContent(), true);

            $user = User::where('id',$request->user_id)->first();
            if(empty($user))
                return $this->sendError("Could not find User", [], 400);
           // $thumbnail = null;    
            // if($file = $request->thumbnail){
            //     $name = time().time().".".$file->getClientOriginalExtension();
            //     $target_path = public_path('/uploads/user_'.$request->user_id);
            //     $file->move($target_path,$name);
            //     $thumbnail = '/uploads/user_'.$request->user_id."/".$name;
            // }
            $user->first_name = $request->first_name;    
            $user->last_name = $request->last_name;    
            $user->phone_number = $request->phone_number;    
            $user->birthday = $request->birthday;    
            $user->gender = $request->gender;    
            $user->thumbnail = $request->thumbnail; 
            if (!$user->save())  
                return $this->sendError('could not update User', [], 202);   
            return $this->sendResponse($user, 'User Updated');
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getUser($user_id){
        try {
            $user = User::where('id',$user_id)->first();
            if(empty($user))
                return $this->sendError("Could not find User", [], 400);
            return $this->sendResponse($user, 'User Updated');
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

}