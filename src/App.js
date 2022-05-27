import "./App.css";
import Question from "./components/Question.js";
import Answer from "./components/Answer.js";
import React, { useState } from "react";
import questions from "./components/QuestionsObject"

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [points,setPoints] = useState(0)
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false)
  console.log("correto?",correct,"incorreto?", incorrect);
  const checkRightAnswer = (isCorrect) => {
    if (isCorrect) {
      setIncorrect(false);
      setCorrect(true);
      setPoints(prevPoints => prevPoints + 1)
    } else {
      setCorrect(false);
      setIncorrect(true);
    }
  };
  const tryAgain = () => {
    setCorrect(false);
    setIncorrect(false);
  };
  const nextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCorrect(false);
      setIncorrect(false);
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }else{
      setGameOver(true)
    }

  };
  return (
    <div className="App">
      {gameOver && <h1>ACABOU</h1>}
      {!correct && !incorrect && !gameOver && (
        <div>
          <div className="row"><div>Pergunta {currentQuestion + 1}</div> <div>Pontuação {points}</div></div>
          
          <Question question={questions[currentQuestion].title} />
          <ol>
            <Answer
              checkRightAnswer={() =>
                checkRightAnswer(
                  questions[currentQuestion].options[0].isCorrect
                )
              }
              answer={questions[currentQuestion].options[0].answer}
            />
            <Answer
              checkRightAnswer={() =>
                checkRightAnswer(
                  questions[currentQuestion].options[1].isCorrect
                )
              }
              answer={questions[currentQuestion].options[1].answer}
            />
            <Answer
              checkRightAnswer={() =>
                checkRightAnswer(
                  questions[currentQuestion].options[2].isCorrect
                )
              }
              answer={questions[currentQuestion].options[2].answer}
            />
            <Answer
              checkRightAnswer={() =>
                checkRightAnswer(
                  questions[currentQuestion].options[3].isCorrect
                )
              }
              answer={questions[currentQuestion].options[3].answer}
            />
          </ol>
        </div>
      )}
      {correct && !incorrect && (
        <>
          <h1 className="right">🎉ACERTOU🎉</h1>
          <button onClick={() => nextQuestion()}>Próxima Pergunta</button>
        </>
      )}
      {incorrect && !correct && (
        <>
          <h1 className="wrong">💩ERROU💩</h1>
          <button onClick={() => tryAgain()}>Tente de novo</button>
        </>
      )}
    </div>
  );
}

export default App;
