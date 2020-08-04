<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Http\Request;
use App\ProviderServices;
use App\Company;

class ProviderServicesController extends ApiBaseController
{
    public function getNearProviderByService ($service_id){
        try {
            $providers = ProviderServices::where('service_id',$service_id)->with('companies')->get();
            if(empty($providers))
            return $this->sendResponse([], 'No Provider was found');  
            else
            return $this->sendResponse($providers, 'Providers returned'); 
        }
        catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getProvidersCompaniesByService($service_id){
        try {
            $providers = ProviderServices::where('service_id',$service_id)->with('companies')->get()->pluck('companies');
            if(empty($providers))
            return $this->sendResponse([], 'No Provider was found');  
            else
            return $this->sendResponse($providers, 'Providers returned'); 
        }
        catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getServicesByCompany($user_id,$service_id) {
        try {
            $company_id = Company::where('user_id',$user_id)->pluck('id')->first();
            $services = ProviderServices::where(['service_id'=>$service_id, 'company_id'=>$company_id])->first();
            if(empty($services))
            return $this->sendResponse([], 'No Provider was found');  
            else
            return $this->sendResponse($services, 'Providers returned'); 
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }
}
