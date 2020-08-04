<?php

namespace App\Http\Controllers;
use App\User;
use App\CarProfile;

use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Http\Request;

class CarProfileController extends ApiBaseController
{
    public function create(Request $request){ 
       
        try {
            $data = json_decode($request->getContent(), true);
             
            $carProfile = CarProfile::create([
                        'user_id' => $data['user_id'],
                        'car_make' => $data['car_make'],
                        'car_model' => $data['car_model'],
                        'fuel_type' => $data['fuel_type'],
                        'year' => $data['year'],
                        'license_number' => $data['license_number'],
                        'insurance_no' => $data['insurance_no'],
                        'extra_notes' => $data['extra_notes'],
                        'default_car' => $data['default_car']
                    ]);
            if(!$carProfile->save())
                return $this->sendError("Could not Save Car Profile", [], 400);       
            return $this->sendResponse($carProfile, 'Car Profile Created');     

        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }

    }

    public function update(Request $request){ 
       
        try {
            $data = json_decode($request->getContent(), true);
        
            $carProfile = CarProfile::where('id',$request->car_id)->first();
            if(empty($carProfile))
                return $this->sendError("Could not find Company", [], 400);
        
            $carProfile->user_id = $request->user_id;  
            $carProfile->car_make = $request->car_make;  
            $carProfile->car_model = $request->car_model;  
            $carProfile->fuel_type = $request->fuel_type;  
            $carProfile->year = $request->year;  
            $carProfile->license_number = $request->license_number;  
            $carProfile->insurance_no = $request->insurance_no;  
            $carProfile->extra_notes = $request->extra_notes;  
            $carProfile->default_car = $request->default_car;   
             
            if(!$carProfile->save())
                return $this->sendError("Could not Save Save Car", [], 400);       
            return $this->sendResponse($carProfile, 'Save Car Updated');     

        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }

    }

    public function destroy($car_id) {
        try {
            $carProfile = CarProfile::where('id',$car_id)->first();
            if(empty($carProfile))
            return $this->sendResponse([], 'No Car was found');  
            if(!$carProfile->delete())
               return $this->sendError('Could not delete Car', [], 202);
            return $this->sendResponse($carProfile, 'Car deleted successfully');
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getCarsByUser ($user_id) {
        try {
            $user = User::where('id',$user_id)->first();
            if(empty($user))
                return $this->sendError("Could not find User", [], 400);
            $carProfile = CarProfile::where('user_id',$user_id)->get();      
           
            if(empty($carProfile))
            return $this->sendResponse([], 'No Car was found');  
            else
            return $this->sendResponse($carProfile, 'Car returned'); 
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getDefaultCarByUser ($user_id){
        try {
            $user = User::where('id',$user_id)->first();
            if(empty($user))
                return $this->sendError("Could not find User", [], 400);
            $carProfile = CarProfile::where(['user_id'=>$user_id, 'default_car'=>'1'])->first();      
           
            if(empty($carProfile))
            return $this->sendResponse([], 'No Car was found');  
            else
            return $this->sendResponse($carProfile, 'Car returned'); 
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getCarsById ($car_id) {
        try {
            $carProfile = CarProfile::where('id',$car_id)->first();      
           
            if(empty($carProfile))
            return $this->sendResponse([], 'No Car was found');  
            else
            return $this->sendResponse($carProfile, 'Car returned'); 
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }
}
