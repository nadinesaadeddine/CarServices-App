<?php

namespace App\Http\Controllers;
use App\User;
use App\CarProfile;
use App\Reminder;
use Carbon\Carbon;

use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Http\Request;

class ReminderController extends ApiBaseController
{
    public function create(Request $request){ 
       
        try {
            $data = json_decode($request->getContent(), true);

            $user = User::where('id',$data['user_id'])->first();
            if(empty($user))
                return $this->sendError("Could not find User", [], 400);
            
            $car_id = CarProfile::where('id', $data['car_id'])->first();  
            if(empty($car_id))
            return $this->sendError("Could not find Default Car", [], 400);

            $reminder = Reminder::create([
                        'user_id' => $data['user_id'],
                        'car_id' => $data['car_id'],
                        'name' => $data['name'],
                        'reminder_on' => '0' 
                    ]);
            if(!$reminder->save())
                return $this->sendError("Could not Save Reminder", [], 400);       
            return $this->sendResponse($reminder, 'Reminder Created');     

        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }

    }


    public function update(Request $request){ 
       
        try {
            $data = json_decode($request->getContent(), true);
          
            $reminder = Reminder::where('id',$request->reminder_id)->first();
            if(empty($reminder))
                return $this->sendError("Could not find Reminder", [], 400);
               
            //$reminder->user_id = $request->user_id;  
            //$reminder->car_id = $request->car_id;  
            $reminder->name = $request->name;  
            if($request->updateName == 0) {
                $reminder->lastService_date = $request->lastService_date;  
                $reminder->dueService_date = $request->dueService_date;  
                $reminder->dateCounter = $request->dateCounter;  
                $reminder->dateType = $request->dateType;  
                $reminder->reminder_on = $request->reminder_on; 
            }   
             
            if(!$reminder->save())
                return $this->sendError("Could not Save Reminder", [], 400);       
            return $this->sendResponse($reminder, 'Reminder Updated');     

        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }

    }

    public function destroy($reminder_id) {
        try {
            $reminder = Reminder::where('id',$reminder_id)->first();
            if(empty($reminder))
            return $this->sendResponse([], 'No Reminder was found');  
            if(!$reminder->delete())
               return $this->sendError('Could not delete Reminder', [], 202);
            return $this->sendResponse($reminder, 'Reminder deleted successfully');
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getReminderById ($reminder_id) {
        try {
            $reminder = Reminder::where('id',$reminder_id)->first();
            if(empty($reminder))
                return $this->sendError("Could not find User", [], 400);
            
            return $this->sendResponse($reminder, 'Reminder returned successfully');
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getRemindersByUser ($car_id){
        try {
            // $user = User::where('id',$user_id)->first();
            // if(empty($user))
            //     return $this->sendError("Could not find User", [], 400);
            
            // $car_id = CarProfile::where(['user_id'=>$user_id, 'default_car'=>'1'])->first()->pluck('id');  
            // if(empty($car_id))
            // return $this->sendError("Could not find Default Car", [], 400);

            $reminders = Reminder::where('car_id',$car_id)->get();
            return $this->sendResponse($reminders, 'Reminders returned successfully');
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getNotifyRemindersByUser ($user_id){
        try {
            $user = User::where('id',$user_id)->first();
            if(empty($user))
                return $this->sendError("Could not find User", [], 400);
           
            $reminders = Reminder::where(['user_id'=>$user_id, 'reminder_on'=>1])->get();
            return $this->sendResponse($reminders, 'Reminders returned successfully');
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    public function getOverdueReminder ($car_id) {
        try{
           
            $reminders = Reminder::where(['car_id'=>$car_id,
                    ['dueService_date','<=',Carbon::now()], 'reminder_on'=>1])->get();
            return $this->sendResponse($reminders, 'Reminders returned successfully');
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }
}
