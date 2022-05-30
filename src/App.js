import "./App.css";
import Question from "./components/Question.js";
import Answer from "./components/Answer.js";
import shuffle from "./components/shuffleArray";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { decode } from "html-entities";

function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const HTTPRequest = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple"
        );
        const newArrayofData = response.data.results.map((item) => ({
          category: item.category,
          difficulty: item.difficulty,
          question: item.question,
          options: shuffle([
            { answer: item.correct_answer, isCorrect: true },
            { answer: item.incorrect_answers[0], isCorrect: false },
            { answer: item.incorrect_answers[1], isCorrect: false },
            { answer: item.incorrect_answers[2], isCorrect: false },
          ]),
        }));
        setData(newArrayofData);
      } catch (e) {
        console.error(e);
      }
    };
    HTTPRequest();
  }, []);

  const checkRightAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrect(true);
      setPoints((prevPoints) => prevPoints + 1);
    } else {
      setIncorrect(true);
    }
  };
  const tryAgain = () => {
    setQuestionIndex(0);
    setPoints(0);
    setCorrect(false);
    setIncorrect(false);
    setGameOver(false);
  };
  const nextQuestion = () => {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < data.length) {
      setCorrect(false);
      setIncorrect(false);
      setQuestionIndex((prevQuestion) => prevQuestion + 1);
    } else {
      setGameOver(true);
    }
  };

  return (
    <div className="App">
      {!correct && !incorrect && !gameOver && data.length > 0 && (
        <div>
          <div className="row details">
            <p>
              Question {questionIndex} / {data.length}
            </p>
            <p>Score: {points}</p>
          </div>
          <Question question={decode(data[questionIndex].question)} />
          <ol>
            <Answer
              checkRightAnswer={() =>
                checkRightAnswer(data[questionIndex].options[0].isCorrect)
              }
              answer={decode(data[questionIndex].options[0].answer)}
            />
            <Answer
              checkRightAnswer={() =>
                checkRightAnswer(data[questionIndex].options[1].isCorrect)
              }
              answer={decode(data[questionIndex].options[1].answer)}
            />
            <Answer
              checkRightAnswer={() =>
                checkRightAnswer(data[questionIndex].options[2].isCorrect)
              }
              answer={decode(data[questionIndex].options[2].answer)}
            />
            <Answer
              checkRightAnswer={() =>
                checkRightAnswer(data[questionIndex].options[3].isCorrect)
              }
              answer={decode(data[questionIndex].options[3].answer)}
            />
          </ol>
          <div className="row details">
            <p>Category: {data[questionIndex].category}</p>
            <p>Difficulty: {data[questionIndex].difficulty}</p>
          </div>
        </div>
      )}

      {correct && !incorrect && !gameOver && (
        <div className="column">
          <h1 className="right">😎 CORRECT 😎</h1>
          <div className="button" onClick={() => nextQuestion()}>
            Next Question
          </div>
        </div>
      )}
      {incorrect && !correct && !gameOver && (
        <div className="column">
          <h1 className="wrong">😒 WRONG 😒</h1>
          <div className="button" onClick={() => nextQuestion()}>
            Next Question
          </div>
        </div>
      )}
      {gameOver && (
        <div className="column">
          <h1 className="over">IT IS OVER</h1>
          <p>
            {points} Right Answers of {data.length}
          </p>
          {points === data.length && <h1 className="right">🎉PERFECT!🎉</h1>}
          <div className="button" onClick={() => tryAgain()}>
            Restart
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
