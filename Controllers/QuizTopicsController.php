<?php


/**
 * This is Quiz Topics controller
 * From here the admin can add,update,delete or view the quiz topics
 */

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\QuizTopicModel;

use Laravel\Lumen\Routing\Controller as BaseController;

class QuizTopicsController extends BaseController
{
    public function get(Request $request) {
        $_obj = new QuizTopicModel();
        $taskRecords = $_obj->get($request);
        return $taskRecords;
    }

    public function post(Request $request) {
        $_obj = new QuizTopicModel();
        $taskRecords = $_obj->post($request);
        return $taskRecords;
    }
    public function update(Request $request) {
        $_obj = new QuizTopicModel();
        $taskRecords = $_obj->edit($request);
        return $taskRecords;
    }
    public function delete(Request $request) {
        $_obj = new QuizTopicModel();
        $taskRecords = $_obj->remove($request);
        return $taskRecords;
    }    
}
