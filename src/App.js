import "./App.css";
import Question from "./components/Question.js";
import Answer from "./components/Answer.js";
import React, { useState } from "react";
import questions from "./components/QuestionsObject";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [points, setPoints] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  console.log("gameover", gameOver, "correct", correct, "incor", incorrect);
  const checkRightAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrect(true);
      setPoints((prevPoints) => prevPoints + 1);
    } else {
      setIncorrect(true);
    }
  };
  const tryAgain = () => {
    setCurrentQuestion(0);
    setPoints(0);
    setCorrect(false);
    setIncorrect(false);
    setGameOver(false);
  };
  const nextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCorrect(false);
      setIncorrect(false);
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      setGameOver(true);
    }
  };
  return (
    <div className="App">
      {gameOver && (
        <div className="column">
          <h1>ACABOU</h1>
          <p>
            Você acertou {points} de {questions.length}
          </p>
          <div className="button" onClick={() => tryAgain()}>
            Recomeçar
          </div>
        </div>
      )}
      {!correct && !incorrect && !gameOver && (
        <div>
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
      {correct && !incorrect && !gameOver && (
        <div className="column">
          <h1 className="right">🎉ACERTOU🎉</h1>
          <div className="button" onClick={() => nextQuestion()}>
            Próxima Pergunta
          </div>
        </div>
      )}
      {incorrect && !correct && !gameOver && (
        <div className="column">
          <h1 className="wrong">💩ERROU💩</h1>
          <div className="button" onClick={() => nextQuestion()}>
            Próxima Pergunta
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
