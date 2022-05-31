import "./App.css";
import CheckAnswer from "./components/CheckAnswer";
import Question from "./components/Question.js";
import Answer from "./components/Answer.js";
import shuffle from "./components/shuffleArray";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { decode } from "html-entities";
import Details1 from "./components/Details1";
import Details2 from "./components/Details2";
import GameOverBox from "./components/GameOverBox";

function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple"
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
    getQuestions();
  }, []);

  const checkRightAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrect(true);
      setPoints((prevPoints) => prevPoints + 1);
      setTimeout(() => nextQuestion(), 1000);
    } else {
      setIncorrect(true);
      setTimeout(() => nextQuestion(), 1000);
    }
  };
  const restart = () => {
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

  return data.length > 0 ? (
    <main className="App">
      {!correct && !incorrect && !gameOver && (
        <section>
          <Details1
            questionIndex={questionIndex + 1}
            dataLength={data.length}
            showPoint={points}
          />
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
          <Details2 category={data[questionIndex].category} difficulty={data[questionIndex].difficulty}/>
        </section>
      )}

      {correct && !incorrect && !gameOver && (
        <CheckAnswer className="right" isCorrect="😎 CORRECT 😎" />
      )}
      {incorrect && !correct && !gameOver && (
        <CheckAnswer className="wrong" isCorrect="😒 WRONG 😒" />
      )}
      {gameOver && (
        <GameOverBox showPoint={points} dataLength={data.length} restart={()=> restart()}/>
      )}
    </main>
  ) : (
    <main className="App">
      <h1>Loading...</h1>
    </main>
  );
}

export default App;
