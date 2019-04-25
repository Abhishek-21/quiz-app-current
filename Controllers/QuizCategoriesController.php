<?php

/**
 * This is Quiz category controller
 * From here the admin can add,update,delete or view the quiz categories
 */

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\QuizCategoriesModel;

use Laravel\Lumen\Routing\Controller as BaseController;

class QuizCategoriesController extends BaseController
{
    public function get(Request $request) {
        $_obj = new QuizCategoriesModel();
        $taskRecords = $_obj->get($request);
        return $taskRecords;
    }

    public function post(Request $request) {
        $_obj = new QuizCategoriesModel();
        $taskRecords = $_obj->post($request);
        return $taskRecords;
    }
    public function update(Request $request) {
        $_obj = new QuizCategoriesModel();
        $taskRecords = $_obj->edit($request);
        return $taskRecords;
    }
    public function delete(Request $request) {
        $_obj = new QuizCategoriesModel();
        $taskRecords = $_obj->remove($request);
        return $taskRecords;
    }

}
