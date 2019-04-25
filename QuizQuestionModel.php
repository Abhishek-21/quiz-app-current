<?php


/**
 * This is the quiz question model all data is passed from here to the controller
 */


namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class QuizQuestionModel extends Model 
{
    protected $table4 = 'Question_set';
    public function get(Request $request) {
        
        if($request->has('Topic_name') && $request->has('quiz')){
          $users = DB::table($this->table4)
            ->where('Topic_name','=',$request['Topic_name'])
            ->get(['Question_title','Question_Description','Answers','Correct_Answer']);
            $users = json_decode($users);
            shuffle($users);    
            return $users; 
        }
        else if($request->has('Topic_name')){
            $users = DB::table($this->table4)
            ->where('Topic_name','=',$request['Topic_name'])
            ->get();
            return $users; 
        }
        else {
            $users = DB::table($this->table4)
            ->get();
            return $users; 
        }
    }

    public function post(Request $request) {
        try{
            $users = DB::table($this->table4)
            ->insert(
                [
                    'Question_title' => $request['question_title'],
                    'Question_Description' => $request['question_description'],
                    'Answers' => $request['question_answers'],
                    'Correct_Answer' => $request['correct_answer'],
                    'Topic_name' => $request['topic_name']
                ]
            );
            return json_encode(array("success" => $users));
        }catch(\Illuminate\Database\QueryException $e){
            $errorCode = $e->errorInfo[1];
            if($errorCode == '1062'){
                return json_encode(array("error" => 'Duplicate entry'));
            }
            else {
                return json_encode(array("error" => $errorCode));
            }
        }    
    }
    public function edit(Request $request) {
        try{    
        $users = DB::table($this->table4)
            ->where('Question_title', $request['old_question_title'])
            ->update([
                    'Question_title' => $request['new_question_title'],
                    'Question_Description' => $request['new_question_description'],
                    'Answers' => $request['new_answers'],
                    'Correct_Answer' => $request['new_correct_answers'],
                    'Topic_name' => $request['new_topic_name'],
                    'Updated_on' => date('Y-m-d h:i:s')
                    ]);
                return json_encode(array("success" => $users));
            }catch(\Illuminate\Database\QueryException $e){
                $errorCode = $e->errorInfo[1];
                if($errorCode == '1062'){
                    return json_encode(array("error" => 'Duplicate entry'));
                }
                else {
                    return json_encode(array("error" => $errorCode));
                }
            }
    }
    public function remove(Request $request) {
        $users = DB::table($this->table4)
        ->where('Question_title', '=', $request['question_title'])->delete();
        return json_encode(array("success" => $users));
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