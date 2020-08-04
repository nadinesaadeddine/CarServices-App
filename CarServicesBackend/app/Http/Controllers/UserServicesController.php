<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Http\Request;
use App\UserServices;
use App\Company;

class UserServicesController extends ApiBaseController
{
    public function create (Request $request){
       
        try {
            $data = json_decode($request->getContent(), true);
            $userService = UserServices::create([
                'service_id' => $data['service_id'],
                'company_id' => $data['company_id'],
                'user_id' => $data['user_id'],
                'booking_date' => $data['booking_date'],
                'booking_time' => $data['booking_time'],
                'booking_now' => $data['booking_now'],
                'price' => $data['price'],
                'notes' => $data['notes'],
                'book_address' => $data['book_address'],
                'status' => $data['status'],
                'car_id' => $data['car_id'],
                'location' => $data['location'],
                'longitude' => $data['longitude'],
                'latitude' => $data['latitude'],
                'status_level' => $data['status_level'],
            ]);
            if(!$userService->save())
                return $this->sendError("Could not Save Service", [], 400);       
            return $this->sendResponse($userService, 'User Service Created'); 
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }

    }

    public function update (Request $request){
        try {
            $data = json_decode($request->getContent(), true);
            $userService = UserServices::where('id',$request->userservice_id)->first();
            if(empty($userService))
                return $this->sendError("Could not find Service", [], 400);
            if($request->isDone==1){
                $userService->isDone = 1; 
            } else {
            $userService->price = $request->price;  
            $userService->status = $request->status;  
            $userService->status_level = $request->status_level;  
            $userService->done_date = $request->done_date;  
            $userService->done_time = $request->done_time;  
            }

            if(!$userService->save())
                return $this->sendError("Could not Save Service", [], 400);       
            return $this->sendResponse($userService, 'User Service Updated'); 
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }

    }

    public function getServicesByUser ($user_id) {
        try {
            $userService = UserServices::where(['user_id'=> $user_id,'isDone'=>0])
                            ->with('service')->with('company')->with('rating')->orderBy('booking_date', 'desc')->get();
            
            return $this->sendResponse($userService, 'User Service returned');      

        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getServiceFinalByUser ($user_id) {
        try {
            $userService = UserServices::where(['user_id'=> $user_id, 'status_level'=>4, 'isDone'=>0])->first();
            return $this->sendResponse($userService, 'User Service returned');      

        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getServiceDoneByUser ($user_id) {
        try {
            $userService = UserServices::where(['user_id'=> $user_id,'isDone'=>1])
                        ->with('service')->with('company')->with('rating')->get();
            return $this->sendResponse($userService, 'User Service returned');      

        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getServicesByCompany ($user_id) {
        try {
            $company_id = Company::where('user_id',$user_id)->pluck('id')->first();
            // if(empty($company_id))
            //     return $this->sendError("Could not find Company", [], 400);
               
            $userService = UserServices::where(['company_id'=>$company_id, 'isDone'=>0])
                            ->with('service')->with('user')->orderBy('booking_date', 'desc')->get(); 
            return $this->sendResponse($userService, 'User Service returned');      

        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getServicesById ($service_id) {
        try {
            $userService = UserServices::where('id',$service_id)->with('company')
                        ->with('user')->first();
            if(empty($userService))
                return $this->sendError("Could not find Service", [], 400);
            return $this->sendResponse($userService, 'User Service returned');      

        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getPendingServicesByCar ($car_id) {
        try {
            $userService = UserServices::where(['car_id'=> $car_id,'isDone'=>0])
                            ->with('service')->with('company')->with('rating')->orderBy('booking_date', 'desc')->get();
            
            return $this->sendResponse($userService, 'User Service returned');      

        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }
}
