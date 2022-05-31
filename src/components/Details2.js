import React from "react";

export default function Details2(props){
    return (
        <div className="row details">
            <p>Category: {props.category === "Entertainment: Video Games" && "Video Games"}</p>
            <p>Difficulty: {props.difficulty}</p>
          </div>
    )
}