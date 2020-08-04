<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\ServiceSetup;

class ServiceSetupController extends ApiBaseController
{
    public function getAllServices (){
        $services = ServiceSetup::all();
        if(empty($services))
            return $this->sendResponse([], 'No Service was found');  
        else
            return $this->sendResponse($services, 'Services returned');  
    }
}
