import React from "react";
import { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((response)=> response.json())
    .then((questions)=>{
      setQuestions(questions)
    })
  },[])

  function handleDelete(id){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
    })
    .then((response)=> response.json())
    .then(()=>{
      const newQuestions = questions.filter((quiz)=> quiz.id !== id);
      setQuestions(newQuestions);
    });
    
    

  };

  function handleUpdate(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({correctIndex})
    })
    .then((response)=> response.json())
    .then((newQuestion)=>{
      const newQuestions = questions.map((quiz)=>{
        if(quiz.id === newQuestions.id) return newQuestion;
        return quiz;
      });
      setQuestions(newQuestions)
    })
  }



  const listOfQuestions = questions.map((question)=>(
    <QuestionItem 
    key={question.id}
    question={question}
    deleteQuestion={handleDelete}
    addQuestion={handleUpdate}
    />
  ))


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      {listOfQuestions}
      </ul>
    </section>
  );
}

export default QuestionList;
