<?php

namespace App\Http\Controllers;
use App\User;
use App\CarProfile;
use App\Fillup;
use Carbon\Carbon;

use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Http\Request;

class FillupController extends ApiBaseController
{
    public function create(Request $request){ 
       
        try {
            $data = json_decode($request->getContent(), true);

            $user = User::where('id',$data['user_id'])->first();
            if(empty($user))
                return $this->sendError("Could not find User", [], 400);
            
            $car = CarProfile::where('id', $data['car_id'])->first();  
            if(empty($car))
            return $this->sendError("Could not find Default Car", [], 400);
            
            $lastFillup = Fillup::where('car_id',$data['car_id'])->orderBy('fill_date', 'desc')->first();
           
            if(!empty($lastFillup)){
                $distancekm = $data['odometer'] - $lastFillup->odometer;
                $distanceml = ($distancekm/1.609);
                $fuel = $data['quantity'];
                $fuelGallon = ($fuel/3.785);
                $kplVal = round($distancekm/$fuel,2);
                $mpgVal = round($distanceml/$fuelGallon,2);
                $distanceml = round($distanceml,2);

            } else {
                $distancekm = null;
                $distanceml = null;
                $kplVal = null;
                $mpgVal = null;
            }
            
            $validator = Validator::make($data, [
                'user_id' => 'required',
                'car_id' => 'required',
                'fill_date' => 'required',
                'odometer' => 'required',
                'quantity' => 'required',
                'price' => 'required',
            ]);

            $fillup = Fillup::create([
                        'user_id' => $data['user_id'],
                        'car_id' => $data['car_id'],
                        'fill_date' => $data['fill_date'],
                        'odometer' => $data['odometer'],
                        'quantity' => $data['quantity'],
                        'price' => $data['price'],
                        'totalcost' => $data['totalcost'],
                        'fillingstation' => $data['fillingstation'],
                        'notes' => $data['notes'],
                        'distanceInKm' => $distancekm,
                        'distanceInMl' => $distanceml,
                        'kml_number' => $kplVal,
                        'mpg_number' => $mpgVal
                    ]);
            if(!$fillup->save())
                return $this->sendError("Could not Save Fill up", [], 400);       
            return $this->sendResponse($fillup, 'Fill up Created');     

        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }

    }

    
    public function update(Request $request){ 
        
        try {
            $data = json_decode($request->getContent(), true);
          
            $fillup = Fillup::where('id',$request->fill_id)->first();
            if(empty($fillup))
                return $this->sendError("Could not find Reminder", [], 400);
                
            $fillup->fill_date = $request->fill_date;  
            $fillup->odometer = $request->odometer;  
            $fillup->quantity = $request->quantity;  
            $fillup->price = $request->price;  
            $fillup->totalcost = $request->totalcost; 
            $fillup->fillingstation = $request->fillingstation; 
            $fillup->notes = $request->notes; 
             
            if(!$fillup->save())
                return $this->sendError("Could not Save Fill up", [], 400);       
            return $this->sendResponse($fillup, 'Fill up Updated');     

        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }

    }

    public function destroy($fill_id) {
        try {
            $fillup = Fillup::where('id',$fill_id)->first();
            if(empty($fillup))
            return $this->sendResponse([], 'No Fill up was found');  
            if(!$fillup->delete())
               return $this->sendError('Could not delete Fill up', [], 202);
            return $this->sendResponse($fillup, 'Fill up deleted successfully');
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getFillupByCar($car_id) {
        
        try{
            $car = CarProfile::where('id', $car_id)->first(); 
            if(empty($car))
            return $this->sendError("Could not find Car", [], 400);

            $fillups = Fillup::where('car_id',$car_id)->orderBy('fill_date', 'desc')->get();
            
            return $this->sendResponse($fillups, 'Fill up returned');  
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getMaxOdomByCar ($car_id) {
        try {
            $car = CarProfile::where('id', $car_id)->first(); 
            if(empty($car))
            return $this->sendError("Could not find Car", [], 400);
            $maxOdometer = Fillup::where('car_id',$car_id)->max('odometer');
            
            return $this->sendResponse($maxOdometer, 'Max Odo returned');  
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }
    public function getFillupLastThirtyDaysByCar($car_id) {
        
        try{
            $car = CarProfile::where('id', $car_id)->first(); 
            if(empty($car))
            return $this->sendError("Could not find Car", [], 400);

            $fillups = Fillup::where('car_id',$car_id)
                        ->whereDate('fill_date', '>', Carbon::now()->subDays(30))
                        ->orderBy('fill_date', 'desc')->get();
            
            return $this->sendResponse($fillups, 'Fill up returned');  
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getSumFuelLastThirtyDays ($car_id) {
        try{
            $car = CarProfile::where('id', $car_id)->first(); 
            if(empty($car))
            return $this->sendError("Could not find Car", [], 400);

            $totalCost = Fillup::where('car_id',$car_id)
                        ->whereDate('fill_date', '>', Carbon::now()->subDays(30))
                        ->sum('totalcost');
            
            return $this->sendResponse($totalCost, 'Fill up returned');  
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }
    public function getFillUpById ($fill_id) {
        try{
            $fillup = Fillup::where('id',$fill_id)->first();
            
            return $this->sendResponse($fillup, 'Fill up returned');  
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }
}
