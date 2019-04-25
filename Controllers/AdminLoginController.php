<?php

/**
 * This is admin controller 
 * 
 * this controller maintains or manages user login  
 *  
 * 
*/
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\AdminLoginModel;

use Laravel\Lumen\Routing\Controller as BaseController;

class AdminLoginController extends BaseController
{
    public function get(Request $request) {
        $_obj = new AdminLoginModel();
        $taskRecords = $_obj->get($request);
        if(!$taskRecords || !$taskRecords->first()) {
            return 0;
        }
        else {
            if($request->has('username') && $request->has('password')){
                return sha1($taskRecords[0]->user_id);                          // sha1 encrytion is used for security
            }
            else if ($request['user_id']) {
                foreach ($taskRecords as $value) {
                    if(sha1($value->user_id) === $request['user_id'])           // sha1 encrytion is used for security
                        return 1;
                }
                return 0;
            }
        }
    }
}
