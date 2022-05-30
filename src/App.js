import "./App.css";
import Question from "./components/Question.js";
import Answer from "./components/Answer.js";
import React, { useState, useEffect } from "react";
// import myQuestions from "./components/QuestionsObject";
import axios from "axios";

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
          "https://opentdb.com/api.php?amount=10&category=15&difficulty=hard&type=multiple"
        );
        const shuffle = (array) => {
          let temporaryValue;
          let randomIndex;
          let currentIndex = array.length;
          while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }
          return array;
        };
        const newArrayofData = response.data.results.map((item) => ({
          question: item.question,
          options: shuffle([
            { answer: item.correct_answer, isCorrect: true },
            { answer: item.incorrect_answers[0], isCorrect: false },
            { answer: item.incorrect_answers[1], isCorrect: false },
            { answer: item.incorrect_answers[2], isCorrect: false },
          ]),
        }));
        setQuestionIndex(0);
        setData(newArrayofData);
        console.log(data);
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
  //TODO RENDER USING MAP
  return (
    <div className="App">
      {gameOver && (
        <div className="column">
          <h1>ACABOU</h1>
          <p>
            Você acertou {points} de {data.length}
          </p>
          <div className="button" onClick={() => tryAgain()}>
            Recomeçar
          </div>
        </div>
      )}
      {!correct && !incorrect && !gameOver && data.length > 0 &&(
        <div>
          <Question question={data[questionIndex].question} />
          <ol>
            <Answer
              checkRightAnswer={() =>
                checkRightAnswer(data[questionIndex].options[0].isCorrect)
              }
              answer={data[questionIndex].options[0].answer}
            />
            <Answer
              checkRightAnswer={() =>
                checkRightAnswer(data[questionIndex].options[1].isCorrect)
              }
              answer={data[questionIndex].options[1].answer}
            />
            <Answer
              checkRightAnswer={() =>
                checkRightAnswer(data[questionIndex].options[2].isCorrect)
              }
              answer={data[questionIndex].options[2].answer}
            />
            <Answer
              checkRightAnswer={() =>
                checkRightAnswer(data[questionIndex].options[3].isCorrect)
              }
              answer={data[questionIndex].options[2].answer}
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
