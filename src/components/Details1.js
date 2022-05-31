import React from "react";

export default function Details1(props){
    return(
        <div className="row details">
        <p>
          Question {props.questionIndex} / {props.dataLength}
        </p>
        <p>Score: {props.showPoint}</p>
      </div>
    )
}