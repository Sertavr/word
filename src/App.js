import React, { createContext, useEffect, useState } from "react";
import Header from "./copmonents/header/Header";
import "./style/appGame/app.css";
import Board from "./copmonents/board/Board";
import KeyBoard from "./copmonents/keyboard/KeyBoard";
import { word } from "./constants/word/Word";
import Clouds from "./copmonents/cloud/Clouds";
import { BsFillSunFill } from "react-icons/bs";
import { setCookie, getCookie } from "./cookie/cookie";

export const AnswersContecst = createContext();

function App() {
const initialAnswers = getCookie("cAnswers")
  ? JSON.parse(getCookie("cAnswers"))
  : new Array(6).fill({
      row: new Array(5).fill(""),
      completed: false,
    });


  const [answers, setAnswers] = useState(
    initialAnswers
  );

  const [isShakeRow, setIsShakeRow] = useState(false);
  const [isGameEnd, setIsGameEnd] = useState(false);

  useEffect(() => {
    answers.forEach(({ row, completed }) => {
      if (completed && row.join("") === word) setIsGameEnd(true);
    });
    if (answers.at(-1).completed && answers.at(-1).row.join("") !== word)
      setIsGameEnd(true);

    //Cookie
    let dataAnswers = JSON.stringify(answers);
    setCookie("cAnswers", dataAnswers);
  }, [answers]);

  const styleSun = {};
  styleSun.opacity =
    isGameEnd && answers.findIndex(({ row }) => row.join("") === word) !== -1
      ? 0.7
      : 0;

  return (
    <AnswersContecst.Provider value={answers}>
      <div
        className="game"
      >
        <Header />
        <Clouds isGameEnd={isGameEnd} />

        <BsFillSunFill
          className={isGameEnd ? "sun" : "beforSun"}
          style={styleSun}
        />

        <Board
          answers={answers}
          isShakeRow={isShakeRow}
          setIsShakeRow={setIsShakeRow}
          isGameEnd={isGameEnd}
        />
        <KeyBoard
          answers={answers}
          setAnswers={setAnswers}
          setIsShakeRow={setIsShakeRow}
          isGameEnd={isGameEnd}
        />
      </div>
    </AnswersContecst.Provider>
  );
}

export default App;