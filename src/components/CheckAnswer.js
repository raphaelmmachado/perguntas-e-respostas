import React from "react"

export default function CheckAnswer (props){
    return(<div className="column">
    <h1 className={props.className}>{props.isCorrect}</h1>
  {/* <div className="button" onClick={() => nextQuestion()}>
    Next Question
  </div> */}
</div>)
}
