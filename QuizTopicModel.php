<?php

/**
 * This is the quiz topic model all data is passed from here to the controller
 */

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class QuizTopicModel extends Model 
{
    protected $table3 = 'Quiz_topics';

    public function get(Request $request) {
        if($request->has('category_name')){
            $users = DB::table($this->table3)
            ->where('Quiz_category','=',$request['category_name'])
            ->get();
            return $users;  
        }
        else {
            $users = DB::table($this->table3)
            ->get();
            return $users;    
        } 
    }

    public function post(Request $request) {
        try{
            $users = DB::table($this->table3)
            ->insert(
                [
                    'Topic_name' => $request['topic_name'],
                    'Quiz_category' => $request['quiz_category_name'],
                    'Topic_description' => $request['topic_description']
                ]
            );
        return json_encode(array("success" => $users));
        } catch(\Illuminate\Database\QueryException $e){
            $errorCode = $e->errorInfo[1];
            if($errorCode == '1062'){
                return json_encode(array("error" => "Duplicate entry"));                
            }
            else {
                return json_encode(array("error" => $errorCode)); //1048  for not null columns
            }
        }    
    }
    public function edit(Request $request) {
            $users = DB::table($this->table3)
            ->where('Topic_name', $request['old_topic_name'])
            ->update([
                    'Topic_name' => $request['new_topic_name'],
                    'Topic_description' => $request['new_description'],
                    'Updated_on' => date('Y-m-d h:i:s')
                    ]);
                    return json_encode(array("success" => $users)); 
    }
    public function remove(Request $request) {
        try {
            $users = DB::table($this->table3)
            ->where('Topic_name', '=', $request['Topic_name'])->delete();
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