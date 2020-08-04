<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Http\Request;
use App\Rating; 

class RatingController extends ApiBaseController
{
    public function create (Request $request){
       
        try {
            $data = json_decode($request->getContent(), true);
            $rating = Rating::create([
                'userservice_id' => $data['userservice_id'],
                'company_id' => $data['company_id'],
                'user_id' => $data['user_id'], 
                'rating_value' => $data['rating_value'], 
            ]);
            if(!$rating->save())
                return $this->sendError("Could not Save Rating", [], 400);       
            return $this->sendResponse($rating, 'Rating Created'); 
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }

    }

    public function getRatingByCompany($company_id) {
        try {
            $avg = Rating::where('company_id', $company_id)->avg('rating_value');
            return $this->sendResponse($avg, 'Rating Created'); 
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

}
