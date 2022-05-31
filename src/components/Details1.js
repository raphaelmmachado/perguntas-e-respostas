import React from "react";

export default function Details1(props){
    return(
        <div className="row details">
        <p>
          Question {props.questionIndex + 1} / {props.dataLength}
        </p>
        <p>Score: {props.showPoints}</p>
      </div>
    )
}