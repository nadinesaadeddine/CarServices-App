<?php

namespace App\Http\Controllers;

use App\User;
use App\Company;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class CompanyController extends ApiBaseController
{
    public function create(Request $request){ 
       
        try {
            $data = json_decode($request->getContent(), true);
           
            $company = Company::create([
                        'user_id' => $data['user_id'],
                        'name' => $data['name'],
                        'description' => $data['description'],
                        'address' => $data['address'],
                        'phone_number' => $data['phone_number'],
                        'location' => $data['location'],
                        'longitude' => $data['longitude'],
                        'latitude' => $data['latitude'],
                        'openingDays' => $data['openingDays'],
                        'openingHour' => $data['openingHour'],
                        'closingHour' => $data['closingHour'],
                        'isClosed' => $data['isClosed']
                    ]);
            if(!$company->save())
                return $this->sendError("Could not Save Company", [], 400);       
            return $this->sendResponse($company, 'Company Created');     

        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }

    }

    public function update (Request $request){
        //$input = file_get_contents('php://input');
        $data = json_decode($request->getContent(), true);
        
        $company = Company::where('id',$request->company_id)->first();
            if(empty($company))
                return $this->sendError("Could not find Company", [], 400);
        try {
            $company->name = $request->name;  
            $company->description = $request->description;  
            $company->address = $request->address;  
            $company->phone_number = $request->phone_number;  
            $company->location = $request->location;  
            $company->longitude = $request->longitude;  
            $company->latitude = $request->latitude;  
            $company->openingDays = $request->openingDays;  
            $company->closingHour = $request->closingHour;  
            $company->isClosed = $request->isClosed;   

            if(!$company->save())
                return $this->sendError("Could not Save Company", [], 400);       
            return $this->sendResponse($company, 'Company Updated');     

        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }

    }

    public function getCompanyByUser($user_id){
        try {
            $user = User::where('id',$user_id)->first();
            if(empty($user))
                return $this->sendError("Could not find User", [], 400);
            $company = Company::where('user_id',$user_id)->first();      
           
            if(empty($company))
            return $this->sendResponse([], 'No company was found');  
            else
            return $this->sendResponse($company, 'Company returned');  
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getCompanyById($company_id){
        try {
            $company = Company::where('id',$company_id)->first();      
           
            if(empty($company))
            return $this->sendResponse([], 'No company was found');  
            else
            return $this->sendResponse($company, 'Company returned');  
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }
}
