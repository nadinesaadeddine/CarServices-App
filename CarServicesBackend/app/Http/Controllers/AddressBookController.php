<?php

namespace App\Http\Controllers;
use App\User;
use App\AddressBook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class AddressBookController extends ApiBaseController
{
    public function create(Request $request){ 
       
        try {
            $data = json_decode($request->getContent(), true);
             
            $addressBook = AddressBook::create([
                        'user_id' => $data['user_id'],
                        'location' => $data['location'],
                        'longitude' => $data['longitude'],
                        'latitude' => $data['latitude'],
                        'house_no' => $data['house_no'],
                        'building_name' => $data['building_name'],
                        'street_name' => $data['street_name'],
                        'extra_notes' => $data['extra_notes'],
                        'saved_as' => $data['saved_as']
                    ]);
            if(!$addressBook->save())
                return $this->sendError("Could not Save Address Book", [], 400);       
            return $this->sendResponse($addressBook, 'Address Book Created');     

        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }

    }
    public function update(Request $request){ 
       
        try {
            $data = json_decode($request->getContent(), true);
        
            $addressBook = AddressBook::where('id',$request->addBook_id)->first();
            if(empty($addressBook))
                return $this->sendError("Could not find Company", [], 400);
        
            $addressBook->user_id = $request->user_id;  
            $addressBook->location = $request->location;  
            $addressBook->longitude = $request->longitude;  
            $addressBook->latitude = $request->latitude;  
            $addressBook->house_no = $request->house_no;  
            $addressBook->building_name = $request->building_name;  
            $addressBook->street_name = $request->street_name;  
            $addressBook->extra_notes = $request->extra_notes;  
            $addressBook->saved_as = $request->saved_as;   
             
            if(!$addressBook->save())
                return $this->sendError("Could not Save Address Book", [], 400);       
            return $this->sendResponse($addressBook, 'Address Book Updated');     

        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }

    }

    public function destroy($address_id) {
        try {
            $addressBook = AddressBook::where('id',$address_id)->first();
            if(empty($addressBook))
            return $this->sendResponse([], 'No Address was found');  
            if(!$addressBook->delete())
               return $this->sendError('Could not delete Address', [], 202);
            return $this->sendResponse($addressBook, 'Address deleted successfully');
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getAddressesByUser ($user_id) {
        try {
            $user = User::where('id',$user_id)->first();
            if(empty($user))
                return $this->sendError("Could not find User", [], 400);
            $addressBook = AddressBook::where('user_id',$user_id)->get(); 
            if(empty($addressBook))
            return $this->sendResponse([], 'No Address was found');  
            else
            return $this->sendResponse($addressBook, 'Address returned');    
        }
        catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getAddressById ($address_id) {
        try {
            
            $addressBook = AddressBook::where('id',$address_id)->first(); 
            if(empty($addressBook))
            return $this->sendResponse([], 'No Address was found');  
            else
            return $this->sendResponse($addressBook, 'Address returned');    
        }
        catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }
}
