import React, { Component } from 'react';
import Header from './Header.jsx';               //this is importing of header section of admin panel
import Model from './Model.jsx';                 //this is importing of model section for adding new contents
import Model2 from './Model2.jsx';               //this is importing of model section for viewing contents
import Model3 from './Model3.jsx';               //this is importing of model section for editing contents
import './Home.css';
import $ from 'jquery';

export default class Home extends Component {
  // constructor being used here to set state for buttons
  constructor(props){
    super(props);

    this.state = {
        button1: 'but',
        button2: 'but2'
    };
  };

  // when the component did mount it should again validate user based on encrytion key
  componentDidMount() {
    let verifyId = document.URL.split("=")[1];
    if ((verifyId.trim() === '') || (verifyId.trim() === null)) {
      window.location="http://localhost:3000/InvalidUser";
    } else {
        let dataString = {
          user_id: verifyId
        };
        dataString = JSON.parse(JSON.stringify(dataString));
        $.ajax ({
          type: "GET",
          contentType: "application/json",
          url: "http://localhost:8000/login",   
          data: dataString,
          success: function(response) {              
            if (response !== '1') {
              window.location="http://localhost:3000/InvalidUser";
            }
          }
        });
    } 

  // model-container is the one which appears when user click on any categories

  document.getElementById("quiz-category").addEventListener("click",() => {
    document.getElementById("model-container-background").style.display = "block";
    this.setState({
      button1: "Add New categories",
      button2: "View Categories"
    })
  })

  document.getElementById("quiz-topic").addEventListener("click",() => {
    document.getElementById("model-container-background").style.display = "block";
    this.setState({
      button1: "Add New Topics",
      button2: "View Topics"
    })
  })

  document.getElementById("question-set").addEventListener("click",() => {
    document.getElementById("model-container-background").style.display = "block";
    this.setState({
      button1: "Add New Questions",
      button2: "View Questions"
    })
  })

  this.saveForm(); // to save forms
  this.editForm(); // to edit forms content
    
  }

  // the following function is used to make an ajax call to fetch the categories using callback

  allCategories = (callback) => {
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "http://localhost:8000/categories",   
      success: callback
    });
  }

  // the following function is used to make an ajax call to fetch the topics using callback

  allTopics = (callback) => {
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "http://localhost:8000/topic",   
      success: callback
    });
  }

    // opening the add or view modal from here

  openChildModal = (valueModal) => {

    // add value container is the modal to add new values based on categories

    document.getElementsByClassName("close-box2")[0].addEventListener("click",() => {
        document.getElementById("add-value-container-background").style.display = "none";
    })

    // view value container is the modal to view existing values based on categories

    document.getElementsByClassName("close-box2")[1].addEventListener("click",() => {
      document.getElementById("view-value-container-background").style.display = "none";
    })

    // only creating dynamic modal for categories and other things based on event listener
    
    if(valueModal.nodeName === 'TR' && valueModal.parentNode.children[0].children[1].innerHTML === 'Category Name') {
      document.getElementById("add-value-container-background").style.display = "block";
      let table = document.getElementById("modalTable");
      document.getElementById('add-value-container-background').style.padding = '7% 0px';
      document.getElementById('add-value-container').style.margin = '4% auto';
      while (table.firstChild){
          table.removeChild(table.firstChild);
      }
      let row = table.insertRow();
      let cell = row.insertCell(0);
      let row1 = table.insertRow();
      let cell1 = row1.insertCell(0);
      let inpField = document.createElement("INPUT");   
      inpField.id = "category-value";
      inpField.className = valueModal.children[1].innerHTML;        // passing original database name as id 
      let btn = document.createElement("BUTTON");  
      btn.id = "Edit-category-content"; 
      inpField.value = valueModal.children[1].innerHTML;
      btn.innerHTML = "Edit Category";                   
      cell.appendChild(inpField);
      cell1.appendChild(btn);
    }


    if(valueModal === 'categories') {
      document.getElementById("add-value-container-background").style.display = "block";
      document.getElementById("view-value-container-background").style.display = "none";
      let table = document.getElementById("modalTable");
      document.getElementById('add-value-container-background').style.padding = '7% 0px';
      document.getElementById('add-value-container').style.margin = '4% auto';
      while (table.firstChild){
          table.removeChild(table.firstChild);
      }
      let row = table.insertRow();
      let cell = row.insertCell(0);
      let row1 = table.insertRow();
      let cell1 = row1.insertCell(0);
      let inpField = document.createElement("INPUT");   
      inpField.id = "category-value";
      let btn = document.createElement("BUTTON");  
      btn.id = "submit-category-content"; 
      inpField.placeholder = "Enter New Category";
      btn.innerHTML = "Save Category";                   
      cell.appendChild(inpField);
      cell1.appendChild(btn);
    }

    // only creating dynamic modal for Topics

    if(valueModal === 'Topics') {
      document.getElementById("add-value-container-background").style.display = "block";
      document.getElementById("view-value-container-background").style.display = "none";
      let table = document.getElementById("modalTable");
      document.getElementById('add-value-container-background').style.padding = '6% 0px';
      document.getElementById('add-value-container').style.margin = '4% auto';
      while (table.firstChild){
          table.removeChild(table.firstChild);
      }
      let topic_id_row = table.insertRow();
      let quiz_category_row = table.insertRow();
      let topic_description_row = table.insertRow();
      let submit_button_row = table.insertRow();
      let topic_id_column = topic_id_row.insertCell(0);
      let quiz_category_column = quiz_category_row.insertCell(0);
      let topic_description_column = topic_description_row.insertCell(0);
      let submit_button_column = submit_button_row.insertCell(0);
      let topic_name_field = document.createElement("INPUT");
      let quiz_category_field = document.createElement("SELECT");
      quiz_category_column.appendChild(quiz_category_field);
      this.allCategories(function(result) {
        result.forEach(element => {
          let quiz_category_options = document.createElement("OPTION");
          quiz_category_options.innerHTML = element.Category_name;
          quiz_category_options.value = element.Category_name;
          quiz_category_field.appendChild(quiz_category_options);
        });
      });
      let topic_description_field = document.createElement("INPUT");
      let submit_button = document.createElement("BUTTON");
      topic_id_column.appendChild(topic_name_field);
      topic_description_column.appendChild(topic_description_field);
      submit_button_column.appendChild(submit_button);
      topic_name_field.placeholder = "Enter The Topic Name";
      topic_name_field.id = "topic-name"; 
      quiz_category_field.id = "quiz-category-field";            
      topic_description_field.placeholder = "Enter The Topic Description";
      topic_description_field.id = "topic-description";
      submit_button.innerHTML = "Save Topic";
      submit_button.id = "submit-topic";
    }

    if(valueModal.nodeName === 'TR' && valueModal.parentNode.children[0].children[1].innerHTML === 'Topic Name') {
      document.getElementById("add-value-container-background").style.display = "block";
      let table = document.getElementById("modalTable");
      document.getElementById('add-value-container-background').style.padding = '6% 0px';
      document.getElementById('add-value-container').style.margin = '4% auto';
      while (table.firstChild){
        table.removeChild(table.firstChild);
      }
      let topic_id_row = table.insertRow();
      let topic_description_row = table.insertRow();
      let submit_button_row = table.insertRow();
      let topic_id_column = topic_id_row.insertCell(0);
      let topic_description_column = topic_description_row.insertCell(0);
      let submit_button_column = submit_button_row.insertCell(0);
      let topic_name_field = document.createElement("INPUT");
      let topic_description_field = document.createElement("INPUT");
      let submit_button = document.createElement("BUTTON");
      topic_id_column.appendChild(topic_name_field);
      topic_description_column.appendChild(topic_description_field);
      submit_button_column.appendChild(submit_button);
      topic_name_field.value = valueModal.children[1].innerHTML;
      topic_name_field.id = "topic-name";
      topic_name_field.className = valueModal.children[1].innerHTML;            
      topic_description_field.value = valueModal.children[3].innerHTML;
      topic_description_field.id = "topic-description";
      topic_description_field.className = valueModal.children[3].innerHTML;
      submit_button.innerHTML = "Edit Topic";
      submit_button.id = "edit-topic";
    }

    // only creating dynamic modal for Questions 

    if(valueModal === 'Questions') {
      document.getElementById("add-value-container-background").style.display = "block";
      document.getElementById("view-value-container-background").style.display = "none";
      let table = document.getElementById("modalTable");
      document.getElementById('add-value-container-background').style.padding = '1.5rem';
      document.getElementById('add-value-container').style.margin = '0px auto';
      while (table.firstChild){
        table.removeChild(table.firstChild);
      }
      let question_title_row = table.insertRow();
      let question_description_row = table.insertRow();
      let answer_row = table.insertRow();
      let more_answer_row = table.insertRow();
      let correct_answer_row = table.insertRow();
      let topic_name_row = table.insertRow();
      let submit_button_row = table.insertRow();
      let question_title_column = question_title_row.insertCell(0);
      let question_description_column = question_description_row.insertCell(0);
      let answer_column = answer_row.insertCell(0);
      let more_answer_column = more_answer_row.insertCell(0);
      more_answer_column.style.padding = "0px 20px";                               //dynamically adding extra fields
      let correct_answer_column = correct_answer_row.insertCell(0);
      let topic_name_column = topic_name_row.insertCell(0);
      let submit_button_column = submit_button_row.insertCell(0);
      let question_title_field = document.createElement("INPUT");
      let question_description_field = document.createElement("INPUT");
      let answer_field = document.createElement("INPUT");
      answer_field.style.width = "75%";
      let add_more_answers = document.createElement("BUTTON");
      add_more_answers.style.width = "40px";
      add_more_answers.style.height = "40px";
      add_more_answers.style.borderRadius = "50%";
      add_more_answers.style.marginLeft = "20px";
      add_more_answers.innerHTML = "+";
      add_more_answers.addEventListener('click',()=>{
      let answer_field_more = document.createElement("INPUT");
      answer_field_more.style.marginTop = "30px";
      answer_field_more.placeholder = "Add more Answers";
      more_answer_column.appendChild(answer_field_more);
      answer_field_more.className = "answer-field";
      })
      let correct_answer_field = document.createElement("INPUT");
      let topic_name_field = document.createElement("SELECT");
      this.allTopics(function(result) {
        result.forEach(element => {
          let quiz_topic_options = document.createElement("OPTION");
          quiz_topic_options.innerHTML = element.Topic_name;
          quiz_topic_options.value = element.Topic_name;
          topic_name_field.appendChild(quiz_topic_options);
        });
      });
      let submit_button_field = document.createElement("BUTTON");
      question_title_column.appendChild(question_title_field);
      question_description_column.appendChild(question_description_field);
      answer_column.appendChild(answer_field);
      answer_column.appendChild(add_more_answers);
      correct_answer_column.appendChild(correct_answer_field);
      topic_name_column.appendChild(topic_name_field);
      submit_button_column.appendChild(submit_button_field);
      question_title_field.placeholder = "Enter The Question Title";
      question_title_field.id = "question-title";
      question_description_field.placeholder = "Enter Question Description";
      question_description_field.id = "question-description";
      answer_field.placeholder = "Enter Your Answer";
      answer_field.className = "answer-field";
      correct_answer_field.placeholder = "Enter The Correct Answer";
      correct_answer_field.id = "correct-answer";
      topic_name_field.id = "Topic-name";
      submit_button_field.innerHTML = "Save Question";
      submit_button_field.id = "submit-question";
    }

    if(valueModal.nodeName === 'TR' && valueModal.parentNode.children[0].children[1].innerHTML === 'Question Title') {
      document.getElementById("add-value-container-background").style.display = "block";
      document.getElementById("view-value-container-background").style.display = "none";
      let table = document.getElementById("modalTable");
      document.getElementById('add-value-container-background').style.padding = '1.5rem';
      document.getElementById('add-value-container').style.margin = '0px auto';
      while (table.firstChild){
        table.removeChild(table.firstChild);
      }
      let question_title_row = table.insertRow();
      let question_description_row = table.insertRow();
      let answer_row = table.insertRow();
      let correct_answer_row = table.insertRow();
      let topic_name_row = table.insertRow();
      let submit_button_row = table.insertRow();
      let question_title_column = question_title_row.insertCell(0);
      let question_description_column = question_description_row.insertCell(0);
      let answer_column = answer_row.insertCell(0);
      let correct_answer_column = correct_answer_row.insertCell(0);
      let topic_name_column = topic_name_row.insertCell(0);
      let submit_button_column = submit_button_row.insertCell(0);
      let question_title_field = document.createElement("INPUT");
      let question_description_field = document.createElement("INPUT");
      let answer_field = document.createElement("INPUT");
      let correct_answer_field = document.createElement("INPUT");
      let topic_name_field = document.createElement("SELECT");
      this.allTopics(function(result) {
        result.forEach(element => {
          let quiz_topic_options = document.createElement("OPTION");
          quiz_topic_options.innerHTML = element.Topic_name;
          quiz_topic_options.value = element.Topic_name;
          topic_name_field.appendChild(quiz_topic_options);
        });
      });
      let submit_button_field = document.createElement("BUTTON");
      question_title_column.appendChild(question_title_field);
      question_description_column.appendChild(question_description_field);
      answer_column.appendChild(answer_field);
      correct_answer_column.appendChild(correct_answer_field);
      topic_name_column.appendChild(topic_name_field);
      submit_button_column.appendChild(submit_button_field);
      question_title_field.value = valueModal.children[1].innerHTML;
      question_title_field.id = "question-title";
      question_title_field.className = valueModal.children[1].innerHTML;
      question_description_field.value = valueModal.children[2].innerHTML;
      question_description_field.id = "question-description";
      answer_field.value = valueModal.children[3].innerHTML;
      answer_field.className = "answer-field";
      correct_answer_field.value = valueModal.children[4].innerHTML;
      correct_answer_field.id = "correct-answer";
      topic_name_field.value = valueModal.children[5].innerHTML;
      topic_name_field.id = "Topic-name";
      submit_button_field.innerHTML = "Edit Question";
      submit_button_field.id = "Edit-question";
    }

    //same as above fetching values from database and showing them as per format

    if(valueModal === 'View Categories') {
      document.getElementById("view-value-container-background").style.display = "block";
      document.getElementById("add-value-container-background").style.display = "none";
      let table = document.getElementById("modalTable2");
      while (table.firstChild){
        table.removeChild(table.firstChild);
      }
      $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8000/categories",
        success: function(response) {              
          let row = table.insertRow();
          let delete_column = row.insertCell(0);
          let edit_column = row.insertCell(0);
          let updated_column = row.insertCell(0);
          let created_column = row.insertCell(0);
          let name_column = row.insertCell(0);
          let id_column = row.insertCell(0);
          id_column.innerHTML = "ID";
          id_column.style.fontWeight = "bold";
          name_column.innerHTML = "Category Name";
          name_column.style.fontWeight = "bold";
          created_column.innerHTML = "Created On";
          created_column.style.fontWeight = "bold";
          updated_column.innerHTML = "Updated On";
          updated_column.style.fontWeight = "bold";
          edit_column.innerHTML = "Edit";
          edit_column.style.fontWeight = "bold";
          delete_column.innerHTML = "Delete";
          delete_column.style.fontWeight = "bold";
          response.forEach((element,index) => {
            let row = table.insertRow();
            row.id = element.Category_id;
            let delete_column = row.insertCell(0);
            let edit_column = row.insertCell(0);
            let updated_column = row.insertCell(0);
            let created_column = row.insertCell(0);
            let name_column = row.insertCell(0);
            let id_column = row.insertCell(0);
            let edit_field = document.createElement("BUTTON");
            let delete_field = document.createElement("BUTTON");
            edit_column.appendChild(edit_field);
            delete_column.appendChild(delete_field);
            id_column.innerHTML = index+1;
            name_column.innerHTML = element.Category_name;
            created_column.innerHTML = element.Created_on;
            updated_column.innerHTML = element.Updated_on;
            edit_field.innerHTML = "Edit";
            delete_field.innerHTML = "Delete";
          });
        }
      });
    }
    if(valueModal === 'View Topics') {
      document.getElementById("view-value-container-background").style.display = "block";
      document.getElementById("add-value-container-background").style.display = "none";
      let table = document.getElementById("modalTable2");
      while (table.firstChild){
          table.removeChild(table.firstChild);
      }
      $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8000/topic",
        success: function(response) {              
          let row = table.insertRow();
          let delete_column = row.insertCell(0);
          let edit_column = row.insertCell(0);
          let updated_column = row.insertCell(0);
          let created_column = row.insertCell(0);
          let Topic_description_column = row.insertCell(0);
          let Quiz_category_column = row.insertCell(0);
          let name_column = row.insertCell(0);
          let id_column = row.insertCell(0);
          id_column.innerHTML = "ID";
          id_column.style.fontWeight = "bold";
          name_column.innerHTML = "Topic Name";
          name_column.style.fontWeight = "bold";
          Quiz_category_column.innerHTML = "Quiz Category";
          Quiz_category_column.style.fontWeight = "bold";
          Topic_description_column.innerHTML = "Topic Description";
          Topic_description_column.style.fontWeight = "bold";
          created_column.innerHTML = "Created On";
          created_column.style.fontWeight = "bold";
          updated_column.innerHTML = "Updated On";
          updated_column.style.fontWeight = "bold";
          edit_column.innerHTML = "Edit";
          edit_column.style.fontWeight = "bold";
          delete_column.innerHTML = "Delete";
          delete_column.style.fontWeight = "bold";
          response.forEach((element,index) => {
            let row = table.insertRow();
            row.id = element.Topic_id;
            let delete_column = row.insertCell(0);
            let edit_column = row.insertCell(0);
            let updated_column = row.insertCell(0);
            let created_column = row.insertCell(0);
            let Topic_description_column = row.insertCell(0);
            let Quiz_category_column = row.insertCell(0);
            let name_column = row.insertCell(0);
            let id_column = row.insertCell(0);
            let edit_field = document.createElement("BUTTON");
            let delete_field = document.createElement("BUTTON");
            edit_column.appendChild(edit_field);
            delete_column.appendChild(delete_field);
            id_column.innerHTML = index+1;
            name_column.innerHTML = element.Topic_name;
            Quiz_category_column.innerHTML = element.Quiz_category;
            Topic_description_column.innerHTML = element.Topic_description;
            created_column.innerHTML = element.Created_on;
            updated_column.innerHTML = element.Updated_on;
            edit_field.innerHTML = "Edit";
            delete_field.innerHTML = "Delete";
          });
        }
      });
    }
    if(valueModal === 'View Questions') {
      document.getElementById("view-value-container-background").style.display = "block";
      document.getElementById("add-value-container-background").style.display = "none";
      let table = document.getElementById("modalTable2");
      while (table.firstChild){
        table.removeChild(table.firstChild);
      }
      $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8000/questions",
        success: function(response) {              
          let row = table.insertRow();
          let delete_column = row.insertCell(0);
          let edit_column = row.insertCell(0);
          let updated_column = row.insertCell(0);
          let Created_on_column = row.insertCell(0);
          let Topic_name_column = row.insertCell(0);
          let Correct_Answer_column = row.insertCell(0);
          let Answers_column = row.insertCell(0);
          let Question_Description_column = row.insertCell(0);
          let Question_title_column = row.insertCell(0);
          let Question_id_column = row.insertCell(0);
          Question_id_column.innerHTML = "ID";
          Question_id_column.style.fontWeight = "bold";
          Question_title_column.innerHTML = "Question Title";
          Question_title_column.style.fontWeight = "bold";
          Question_Description_column.innerHTML = "Question Description";
          Question_Description_column.style.fontWeight = "bold";
          Answers_column.innerHTML = "Answers";
          Answers_column.style.fontWeight = "bold";
          Correct_Answer_column.innerHTML = "Correct Answer";
          Correct_Answer_column.style.fontWeight = "bold";
          Topic_name_column.innerHTML = "Topic Name";
          Topic_name_column.style.fontWeight = "bold";
          Created_on_column.innerHTML = "Created On";
          Created_on_column.style.fontWeight = "bold";
          updated_column.innerHTML = "Updated On";
          updated_column.style.fontWeight = "bold";
          edit_column.innerHTML = "Edit";
          edit_column.style.fontWeight = "bold";
          delete_column.innerHTML = "Delete";
          delete_column.style.fontWeight = "bold";
          response.forEach((element,index) => {
            let row = table.insertRow();
            row.id = element.Question_id;
            let delete_column = row.insertCell(0);
            let edit_column = row.insertCell(0);
            let updated_column = row.insertCell(0);
            let Created_on_column = row.insertCell(0);
            let Topic_name_column = row.insertCell(0);
            let Correct_Answer_column = row.insertCell(0);
            let Answers_column = row.insertCell(0);
            let Question_Description_column = row.insertCell(0);
            let Question_title_column = row.insertCell(0);
            let Question_id_column = row.insertCell(0);
            let edit_field = document.createElement("BUTTON");
            let delete_field = document.createElement("BUTTON");
            edit_column.appendChild(edit_field);
            delete_column.appendChild(delete_field);
            Question_id_column.innerHTML = index+1;
            Question_title_column.innerHTML = element.Question_title;
            Question_Description_column.innerHTML = element.Question_Description;
            Answers_column.innerHTML = element.Answers;
            Correct_Answer_column.innerHTML = element.Correct_Answer;
            Topic_name_column.innerHTML = element.Topic_name;
            Created_on_column.innerHTML = element.Created_on;
            updated_column.innerHTML = element.Updated_on;
            edit_field.innerHTML = "Edit";
            delete_field.innerHTML = "Delete";
          });
        }
      });
    }
  }

  // the following function is used to submit values to the database after validating them 

  saveForm = () => {
    document.getElementById("modalTable").addEventListener('click',(e) => {
      if(e.target.id === 'submit-category-content') {
        let category = document.getElementById("category-value").value;
        if(category === '' || category === null) {
          alert("Category field cannot be Empty!!!");
        } else {
          let dataString = {
            "category_name": category
          }
          dataString = (JSON.stringify(dataString));
          $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8000/categories",        
            data: dataString,
            success: function(response) {              
              let result = JSON.parse(response);
              if(result.success) {
                document.getElementById("category-value").value = '';
                document.getElementById("message-box").innerText = 'Saved Successfully!!!';
                document.getElementById("message-box").style.display = "inline-block";
                document.getElementById("add-value-container-background").style.display = "none";
                $('#message-box').delay(2000).fadeOut('slow');
              } else if(result.error === 'Duplicate entry'){
                document.getElementById("category-value").value = '';
                document.getElementById("message-box").innerText = 'Duplicate Entry!';
                document.getElementById("message-box").style.display = "inline-block";
                $('#message-box').delay(2000).fadeOut('slow');
              } else {
                document.getElementById("category-value").value = '';
                document.getElementById("message-box").innerText = 'Server Error!';
                document.getElementById("message-box").style.display = "inline-block";
                $('#message-box').delay(2000).fadeOut('slow');
              }
            }
          });
        }
      }
      if(e.target.id === 'Edit-category-content') {
        let old_category_name = document.getElementById("category-value").className;
        let new_category_name = document.getElementById("category-value").value;
        if(new_category_name === '' || new_category_name === null){
          alert('Category field cannot be null!!!');
        }
        else{
          let dataString = {
            "old_category_name": old_category_name,
            "new_category_name": new_category_name
        }
        dataString = (JSON.stringify(dataString));
        $.ajax({
            type: "PUT",
            contentType: "application/json",
            url: "http://localhost:8000/categories",        
            data: dataString,
            success: function(response) {              
              let result = JSON.parse(response);
              if(result.success) {
                document.getElementById("add-value-container-background").style.display = "none";
                document.getElementById("category-value").value = '';
                document.getElementById("message-box").innerText = 'Saved Successfully!!!'; 
                document.getElementById("message-box").style.display = "inline-block";
                $('#message-box').delay(2000).fadeOut('slow');
              }
              else if(result.error === 'Duplicate entry'){
                document.getElementById("category-value").value = '';
                document.getElementById("message-box").innerText = 'Duplicate Entry!';
                document.getElementById("message-box").style.display = "inline-block";
                $('#message-box').delay(2000).fadeOut('slow');
              }
              else {
                document.getElementById("category-value").value = '';
                document.getElementById("message-box").innerText = 'Server Error!';
                document.getElementById("message-box").style.display = "inline-block";
                $('#message-box').delay(2000).fadeOut('slow');
              }
            }
          });
        }
      }
      if(e.target.id === 'submit-topic') {
        let topic_name = document.getElementById("topic-name").value;  
        let quiz_category = document.getElementById("quiz-category-field").value;
        let topic_description = document.getElementById("topic-description").value;
        if(topic_name === '' || topic_name === null){
          alert("Topic name cannot be Null !!!");
        } else {
            let dataString = {
              "topic_name": topic_name,
              "quiz_category_name": quiz_category,
              "topic_description": topic_description
            }
            dataString = (JSON.stringify(dataString));
            $.ajax({
              type: "POST",
              contentType: "application/json",
              url: "http://localhost:8000/topic",        
              data: dataString,
              success: function(response) {              
                let result = JSON.parse(response);
                if(result.success) {
                  document.getElementById("topic-name").value = '';
                  $("#quiz-category-field").val($("#quiz-category-field option:first").val());
                  document.getElementById("topic-description").value = '';
                  document.getElementById("message-box").innerText = 'Saved Successfully!!!';
                  document.getElementById("message-box").style.display = "inline-block";
                  document.getElementById("add-value-container-background").style.display = "none";
                  $('#message-box').delay(2000).fadeOut('slow');
                } else if(result.error === 'Duplicate entry') {
                  document.getElementById("topic-name").value = '';
                  $("#quiz-category-field").val($("#quiz-category-field option:first").val());                          
                  document.getElementById("topic-description").value = '';
                  document.getElementById("message-box").innerText = 'Duplicate Entry!';
                  document.getElementById("message-box").style.display = "inline-block";
                  $('#message-box').delay(2000).fadeOut('slow');
                } else {
                  document.getElementById("topic-name").value = '';
                  $("#quiz-category-field").val($("#quiz-category-field option:first").val());
                  document.getElementById("topic-description").value = '';
                  document.getElementById("message-box").innerText = 'Server Error!';
                  document.getElementById("message-box").style.display = "inline-block";
                  $('#message-box').delay(2000).fadeOut('slow');
                }
              }
            });
        }
      }
      if(e.target.id === 'edit-topic') {
        let old_topic_name = document.getElementById("topic-name").className;
        let new_topic_name = document.getElementById("topic-name").value;  
        let new_topic_description = document.getElementById("topic-description").value;
        if(new_topic_name === '' || new_topic_name === null){
          alert('Topic name cannot be Null !!!');
        } else {
          let dataString = {
            "old_topic_name": old_topic_name,
            "new_topic_name": new_topic_name,
            "new_description": new_topic_description
          }
          dataString = (JSON.stringify(dataString));
          $.ajax({
            type: "PUT",
            contentType: "application/json",
            url: "http://localhost:8000/topic",        
            data: dataString,
            success: function(response) {              
              let result = JSON.parse(response);
              if(result.success) {
                document.getElementById("add-value-container-background").style.display = "none";
                document.getElementById("topic-name").value = '';
                document.getElementById("topic-description").value = '';
                document.getElementById("message-box").innerText = 'Saved Successfully!!!';
                document.getElementById("message-box").style.display = "inline-block";
                $('#message-box').delay(2000).fadeOut('slow');
              }
              else {
                document.getElementById("topic-name").value = '';
                document.getElementById("topic-description").value = '';
                document.getElementById("message-box").innerText = 'Server Error!';
                document.getElementById("message-box").style.display = "inline-block";
                $('#message-box').delay(2000).fadeOut('slow');
              }
            }
          });
        }
      }
      if(e.target.id === 'submit-question') {
         let answers = document.getElementsByClassName("answer-field");
         let element = '';
         for (let index = 0; index < answers.length; index++) {
          element = answers[index].value+','+element;
         }
         answers = element.substr(0,element.length-1);
         
        let question_name = document.getElementById("question-title").value;  
        let question_description = document.getElementById("question-description").value;
        // let answers = document.getElementsByClassName("answer-field")[0].value;
        let correct_answers = document.getElementById("correct-answer").value;
        let topic_name = document.getElementById("Topic-name").value;
        if(question_name === '' || question_name === null){
          alert("Question name cannot be Null");
        }
        else {
          let dataString = {
            "question_title": question_name,
            "question_description": question_description,
            "question_answers": answers,
            "correct_answer": correct_answers,
            "topic_name": topic_name
          }
          dataString = (JSON.stringify(dataString));
          $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8000/questions",        
            data: dataString,
            success: function(response) {              
              let result = JSON.parse(response);
              if(result.success) {
                document.getElementById("question-title").value = '';
                document.getElementById("question-description").value = '';
                document.getElementsByClassName("answer-field")[0].value = '';
                document.getElementById("correct-answer").value = '';
                $("#Topic-name").val($("#Topic-name option:first").val());
                document.getElementById("message-box").innerText = 'Saved Successfully!!!';
                document.getElementById("message-box").style.display = "inline-block";
                document.getElementById("add-value-container-background").style.display = "none";
                $('#message-box').delay(2000).fadeOut('slow');
              } else if(result.error === 'Duplicate entry') {
                document.getElementById("question-title").value = '';
                document.getElementById("question-description").value = '';
                document.getElementsByClassName("answer-field")[0].value = '';
                document.getElementById("correct-answer").value = '';
                $("#Topic-name").val($("#Topic-name option:first").val());
                document.getElementById("message-box").innerText = 'Duplicate Entry!';
                document.getElementById("message-box").style.display = "inline-block";
                $('#message-box').delay(2000).fadeOut('slow');
              } else {
                document.getElementById("question-title").value = '';
                document.getElementById("question-description").value = '';
                document.getElementsByClassName("answer-field")[0].value = '';
                document.getElementById("correct-answer").value = '';
                $("#Topic-name").val($("#Topic-name option:first").val());
                document.getElementById("message-box").innerText = 'Server Error!';
                document.getElementById("message-box").style.display = "inline-block";
                $('#message-box').delay(2000).fadeOut('slow');
              }
            }
          });
        }
      }
      if(e.target.id === 'Edit-question') {
        let old_question_title = document.getElementById("question-title").className;  
        let new_question_title = document.getElementById("question-title").value;  
        let new_question_description = document.getElementById("question-description").value;
        let answers = document.getElementsByClassName("answer-field")[0].value;
        let correct_answers = document.getElementById("correct-answer").value;
        let topic_name = document.getElementById("Topic-name").value;
        if(new_question_title === '' || new_question_title === null){
          alert('Question title cannot be null');
        }
        else {
          let dataString = {
            "old_question_title": old_question_title,
            "new_question_title": new_question_title,
            "new_question_description": new_question_description,
            "new_answers": answers,
            "new_correct_answers": correct_answers,
            "new_topic_name": topic_name
          }
          dataString = (JSON.stringify(dataString));
          $.ajax({
            type: "PUT",
            contentType: "application/json",
            url: "http://localhost:8000/questions",        
            data: dataString,
            success: function(response) {              
              let result = JSON.parse(response);
              if(result.success) {
                document.getElementById("add-value-container-background").style.display = "none";
                document.getElementById("question-title").value = '';
                document.getElementById("question-description").value = '';
                document.getElementsByClassName("answer-field")[0].value = '';
                document.getElementById("correct-answer").value = '';
                $("#Topic-name").val($("#Topic-name option:first").val());
                document.getElementById("message-box").innerText = 'Saved Successfully!!!';
                document.getElementById("message-box").style.display = "inline-block";
                $('#message-box').delay(2000).fadeOut('slow');
              } else if(result.error === 'Duplicate entry') {
                document.getElementById("add-value-container-background").style.display = "none";
                document.getElementById("question-title").value = '';
                document.getElementById("question-description").value = '';
                document.getElementsByClassName("answer-field")[0].value = '';
                document.getElementById("correct-answer").value = '';
                $("#Topic-name").val($("#Topic-name option:first").val());
                document.getElementById("message-box").innerText = 'Duplicate Entry!';
                document.getElementById("message-box").style.display = "inline-block";
                $('#message-box').delay(2000).fadeOut('slow');
              } else {
                document.getElementById("add-value-container-background").style.display = "none";
                document.getElementById("question-title").value = '';
                document.getElementById("question-description").value = '';
                document.getElementsByClassName("answer-field")[0].value = '';
                document.getElementById("correct-answer").value = '';
                $("#Topic-name").val($("#Topic-name option:first").val());                      
                document.getElementById("message-box").innerText = 'Server Error!';
                document.getElementById("message-box").style.display = "inline-block";
                $('#message-box').delay(2000).fadeOut('slow');
              }
            }
          });
        }
      }
    })  
  }

  // this function is used to delete a specific existing row from any category,topic or question set

  deleteRow = (valueDelete) => {
    if(valueDelete.nodeName === 'TR' && valueDelete.parentNode.children[0].children[1].innerHTML === 'Category Name') {
      let category_name = valueDelete.children[1].innerHTML;
      let dataString = {
        "category_name": category_name
      }
      dataString = (JSON.stringify(dataString));
      $.ajax({
        type: "DELETE",
        contentType: "application/json",
        url: "http://localhost:8000/categories",        
        data: dataString,
        success: function(response) {              
          let result = JSON.parse(response);
          if(result.success) {
            document.getElementById("message-box").innerText = 'Deletion Successful!!!';
            document.getElementById("message-box").style.display = "inline-block";
            $('#message-box').delay(2000).fadeOut('slow');
          } else if(result.error === 1451) {
            document.getElementById("message-box").innerText = 'Cannot Delete, Category cantains Data!!!';
            document.getElementById("message-box").style.display = "inline-block";
            $('#message-box').delay(2000).fadeOut('slow');
          } else {
            document.getElementById("message-box").innerText = 'Server Error!';
            document.getElementById("message-box").style.display = "inline-block";
            $('#message-box').delay(2000).fadeOut('slow');
          }
        }
      });
    }
    if(valueDelete.nodeName === 'TR' && valueDelete.parentNode.children[0].children[1].innerHTML === 'Topic Name') {
      let Topic_name = valueDelete.children[1].innerHTML;
      let dataString = {
        "Topic_name": Topic_name
      }
      dataString = (JSON.stringify(dataString));
      $.ajax({
        type: "DELETE",
        contentType: "application/json",
        url: "http://localhost:8000/topic",        
        data: dataString,
        success: function(response) {              
          let result = JSON.parse(response);
          if(result.success) {
            document.getElementById("message-box").innerText = 'Deletion Successful!!!';
            document.getElementById("message-box").style.display = "inline-block";
            $('#message-box').delay(2000).fadeOut('slow');
          } else if(result.error === 1451) {
            document.getElementById("message-box").innerText = 'Cannot Delete, Topic cantains Data!!!';
            document.getElementById("message-box").style.display = "inline-block";
            $('#message-box').delay(2000).fadeOut('slow');
          } else {
            document.getElementById("message-box").innerText = 'Server Error!';
            document.getElementById("message-box").style.display = "inline-block";
            $('#message-box').delay(2000).fadeOut('slow');
          }
        }
      });
    }
    if(valueDelete.nodeName === 'TR' && valueDelete.parentNode.children[0].children[1].innerHTML === 'Question Title') {
      let question_title = valueDelete.children[1].innerHTML;
      let dataString = {
        "question_title": question_title
      }
      dataString = (JSON.stringify(dataString));
      $.ajax({
        type: "DELETE",
        contentType: "application/json",
        url: "http://localhost:8000/questions",        
        data: dataString,
        success: function(response) {    
          let result = JSON.parse(response);
          if(result.success) {
            document.getElementById("message-box").innerText = 'Deletion Successful!!!';
            document.getElementById("message-box").style.display = "inline-block";
            $('#message-box').delay(2000).fadeOut('slow');
          } else {
            document.getElementById("message-box").innerText = 'Server Error!';
            document.getElementById("message-box").style.display = "inline-block";
            $('#message-box').delay(2000).fadeOut('slow');
          }
        }
      });
    }
  }

  // the following form is used to edit the existing data from the table

  editForm = () => {
    document.getElementById('modalTable2').addEventListener('click',(e) => {
      if(e.target.nodeName === 'BUTTON' && e.target.innerHTML === 'Edit') {
        document.getElementById("view-value-container-background").style.display = "none";
        this.openChildModal(e.target.parentNode.parentNode); 
      }
      if(e.target.nodeName === 'BUTTON' && e.target.innerHTML === 'Delete') {
        document.getElementById("view-value-container-background").style.display = "none";
        this.deleteRow(e.target.parentNode.parentNode);
      }
    })
  }

  // finally ht render method is used to render the UI
  
  render() {
    return (
      <div id="home-page-container">
        <Header />
        <div id="message-box">default</div>
        <Model button1={this.state.button1} button2={this.state.button2} openChildModal={this.openChildModal}/>
        <Model2 button1={this.state.button1} />
        <Model3 button1={this.state.button1} />
      </div>
    );
  }
}


