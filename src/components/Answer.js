import React from "react";
function Answer(props) {
  return <li onClick={props.checkRightAnswer}>{props.answer}</li>;
}
export default Answer;
