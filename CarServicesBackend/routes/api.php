<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', 'UserController@login');
Route::post('/create', 'UserController@create');



Route::middleware('auth:api')->group( function () {

        
    //User Routes
    Route::post('/update', 'UserController@update');
    Route::get('/user/{user}/getUser', 'UserController@getUser');

    //Company Routes
    Route::post('/company/create', 'CompanyController@create');
    Route::post('/company/update', 'CompanyController@update');
    Route::get('/company/{user}/getCompanyByUser', 'CompanyController@getCompanyByUser');
    Route::get('/company/{company}/getCompanyById', 'CompanyController@getCompanyById');

    //Service Setup Routes
    Route::get('/serviceSetup/getAllServices', 'ServiceSetupController@getAllServices');
        //Service Provider
    Route::get('/providerService/{service_id}/getNearProviderByService', 'ProviderServicesController@getNearProviderByService');
    Route::get('/providerService/{service_id}/getProvidersCompaniesByService', 'ProviderServicesController@getProvidersCompaniesByService');
    Route::get('/providerService/{user_id}/{service_id}/getServicesByCompany', 'ProviderServicesController@getServicesByCompany');

    //User Service
    Route::post('/userService/create', 'UserServicesController@create');
    Route::post('/userService/update', 'UserServicesController@update');
    Route::get('/userService/{user}/getServicesByUser', 'UserServicesController@getServicesByUser');
    Route::get('/userService/{user}/getServiceFinalByUser', 'UserServicesController@getServiceFinalByUser');
    Route::get('/userService/{user}/getServiceDoneByUser', 'UserServicesController@getServiceDoneByUser');
    Route::get('/userService/{user}/getServicesByCompany', 'UserServicesController@getServicesByCompany');
    Route::get('/userService/{userService}/getServicesById', 'UserServicesController@getServicesById');
    Route::get('/userService/{carProfile}/getPendingServicesByCar', 'UserServicesController@getPendingServicesByCar');
        
    //Car Profile
    Route::post('/carProfile/create', 'CarProfileController@create');
    Route::post('/carProfile/update', 'CarProfileController@update');
    Route::get('/carProfile/{user}/getCarsByUser', 'CarProfileController@getCarsByUser');
    Route::get('/carProfile/{user}/getDefaultCarByUser', 'CarProfileController@getDefaultCarByUser');
    Route::get('/carProfile/{carProfile}/getCarsById', 'CarProfileController@getCarsById');
    Route::get('/carProfile/{carProfile}/destroy', 'CarProfileController@destroy');

    //Address Book
    Route::post('/addressBook/create', 'AddressBookController@create');
    Route::post('/addressBook/update', 'AddressBookController@update');
    Route::get('/addressBook/{user}/getAddressesByUser', 'AddressBookController@getAddressesByUser');
    Route::get('/addressBook/{addressBook}/getAddressById', 'AddressBookController@getAddressById');
    Route::get('/addressBook/{addressBook}/destroy', 'AddressBookController@destroy');

    //Reminders
    Route::post('/reminder/create', 'ReminderController@create');
    Route::post('/reminder/update', 'ReminderController@update');
    Route::get('/reminder/{user}/getRemindersByUser', 'ReminderController@getRemindersByUser');
    Route::get('/reminder/{user}/getNotifyRemindersByUser', 'ReminderController@getNotifyRemindersByUser');
    Route::get('/reminder/{CarProfile}/getOverdueReminder', 'ReminderController@getOverdueReminder');
    Route::get('/reminder/{reminder}/getReminderById', 'ReminderController@getReminderById');
    Route::get('/reminder/{reminder}/destroy', 'ReminderController@destroy');    

    //Rating
    Route::post('/rating/create', 'RatingController@create');
    Route::get('/rating/{company}/getRatingByCompany', 'RatingController@getRatingByCompany');

    //fillup
    Route::post('/fillup/create', 'FillupController@create');
    Route::post('/fillup/update', 'FillupController@update');
    Route::get('/fillup/{fillup}/getFillUpById', 'FillupController@getFillUpById');
    Route::get('/fillup/{CarProfile}/getFillupByCar', 'FillupController@getFillupByCar');
    Route::get('/fillup/{CarProfile}/getFillupLastThirtyDaysByCar', 'FillupController@getFillupLastThirtyDaysByCar');
    Route::get('/fillup/{CarProfile}/getSumFuelLastThirtyDays', 'FillupController@getSumFuelLastThirtyDays');
    Route::get('/fillup/{CarProfile}/getMaxOdomByCar', 'FillupController@getMaxOdomByCar');
    Route::get('/fillup/{fillup}/destroy', 'FillupController@destroy');

    //expense
    Route::post('/expense/create', 'ExpenseController@create');
    Route::post('/expense/update', 'ExpenseController@update');
    Route::get('/expense/{CarProfile}/getExpenseByCar', 'ExpenseController@getExpenseByCar');
    Route::get('/expense/{fillup}/destroy', 'ExpenseController@destroy');
});