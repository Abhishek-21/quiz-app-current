<?php

/**
 * This is the quiz category model all data is passed from here to the controller
 */

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class QuizCategoriesModel extends Model 
{
    protected $Quiz_categories = 'Quiz_categories';
    public function get(Request $request) {
        $users = DB::table($this->Quiz_categories)
                ->get();
        return $users;     
    }

    public function post(Request $request) {
        try{
            $users = DB::table($this->Quiz_categories)
            ->insert(
                ['Category_name' => $request['category_name']]
            );
            return json_encode(array("success" => $users));
        }catch(\Illuminate\Database\QueryException $e){
            $errorCode = $e->errorInfo[1];
            if($errorCode == '1062'){
                return json_encode(array("error" => "Duplicate entry"));
            }
            else{
                return json_encode(array("error" => $errorCode));
            }
        }    
    }
    public function edit(Request $request) {
           try {
                $users = DB::table($this->Quiz_categories)
                ->where('Category_name', $request['old_category_name'])
                ->update([
                        'Category_name' => $request['new_category_name'],
                        'Updated_on' => date('Y-m-d h:i:s')
                        ]);
                return json_encode(array("success" => $users));
           } catch(\Illuminate\Database\QueryException $e) {
                $errorCode = $e->errorInfo[1];
                return json_encode(array("error" => $errorCode));
           }
            
    }
    public function remove(Request $request) {
        try {
            $users = DB::table($this->Quiz_categories)
            ->where('Category_name', '=', $request['category_name'])->delete();
            return json_encode(array("success" => $users));
        } catch (\Illuminate\Database\QueryException $e) {
            $errorCode = $e->errorInfo[1];
            return json_encode(array("error" => $errorCode));
        }
    }
}


/// update and delete task funtionalies need to be checked foreign key constraint



// create table Quiz_topics(
//     Topic_id int(11) auto_increment primary key not null,
//     Topic_name varchar(255),
//     Quiz_category varchar(255),
//     Topic_description varchar(255),
//     Created_on datetime default CURRENT_TIMESTAMP,
//     Updated_on varchar(255) default '0000-00-00 00:00:00',
//     );


// create table Question_set(
//     Question_id int(11) auto_increment primary key not null,
//     Question_title varchar(255),
//     Question_Description text,
//     Answers varchar(255),
//     Correct_Answer varchar(255),
//     Status enum('1','0'),
//     Topic_name varchar(255)
//     );

// CREATE TABLE `Quiz_app`.`Quiz_categories` ( `Category_id` INT(11) NOT NULL AUTO_INCREMENT ,  `Category_name` VARCHAR(255) NOT NULL ,  `Created_on` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,  `Updated_on` VARCHAR(255) NOT NULL DEFAULT '\'0000-00-00 00:00:00\'' ,    RIMARY KEY  (`Category_id`)) ENGINE = InnoDB;