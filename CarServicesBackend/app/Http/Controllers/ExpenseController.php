<?php

namespace App\Http\Controllers;

use App\User;
use App\CarProfile;
use App\Expense;
use Carbon\Carbon;

use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Http\Request;

class ExpenseController extends ApiBaseController
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
                        
            $expense = Expense::create([
                        'user_id' => $data['user_id'],
                        'car_id' => $data['car_id'],
                        'expense_date' => $data['expense_date'],
                        'expense_title' => $data['expense_title'],
                        'expense_vendor' => $data['expense_vendor'],
                        'cost' => $data['cost'],
                        'notes' => $data['notes']
                    ]);
            if(!$expense->save())
                return $this->sendError("Could not Save Expense", [], 400);       
            return $this->sendResponse($expense, 'Expense Created');     

        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }

    }

    
    public function update(Request $request){ 
        
        try {
            $data = json_decode($request->getContent(), true);
          
            $expense = Expense::where('id',$request->expense_id)->first();
            if(empty($expense))
                return $this->sendError("Could not find Reminder", [], 400);
                
            $expense->expense_date = $request->expense_date;  
            $expense->expense_title = $request->expense_title;  
            $expense->expense_vendor = $request->expense_vendor;  
            $expense->cost = $request->cost;  
            $expense->notes = $request->notes; 
           
             
            if(!$expense->save())
                return $this->sendError("Could not Save Expense", [], 400);       
            return $this->sendResponse($expense, 'Expense Updated');     

        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }

    }

    
    public function destroy($expense_id) {
        try {
            $expense = Expense::where('id',$expense_id)->first();
            if(empty($expense))
            return $this->sendResponse([], 'No Expense was found');  
            if(!$expense->delete())
               return $this->sendError('Could not delete Expense', [], 202);
            return $this->sendResponse($expense, 'Expense deleted successfully');
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }


    public function getExpenseByCar($car_id) {
        
        try{
            $car = CarProfile::where('id', $car_id)->first(); 
            if(empty($car))
            return $this->sendError("Could not find Car", [], 400);

            $expense = Expense::where('car_id',$car_id)->orderBy('expense_date', 'desc')->get();
            
            return $this->sendResponse($expense, 'Expense returned');  
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }
}
