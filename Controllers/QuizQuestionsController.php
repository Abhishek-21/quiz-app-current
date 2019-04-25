<?php


/**
 * This is Quiz Question controller
 * From here the admin can add,update,delete or view the quiz Questions
 */

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\QuizQuestionModel;

use Laravel\Lumen\Routing\Controller as BaseController;

class QuizQuestionsController extends BaseController
{
    public function get(Request $request) {
        $_obj = new QuizQuestionModel();
        $taskRecords = $_obj->get($request);
        return $taskRecords;
    }
    public function post(Request $request) {
        $_obj = new QuizQuestionModel();
        $taskRecords = $_obj->post($request);
        return $taskRecords;
    }
    public function update(Request $request) {
        $_obj = new QuizQuestionModel();
        $taskRecords = $_obj->edit($request);
        return $taskRecords;
    }
    public function delete(Request $request) {
        $_obj = new QuizQuestionModel();
        $taskRecords = $_obj->remove($request);
        return $taskRecords;
    }
}
