import React, { useEffect, useRef } from "react";
import Row from "../row/Row";
import "../../style/board/board.css";
import { word } from "../../constants/word/Word";

const Board = ({ answers, isShakeRow, setIsShakeRow, isGameEnd, isDark }) => {
  const ref = useRef([]);

  const message = (el) => {
    setTimeout(() => (el.style.opacity = 1), 3500);
  };
  useEffect(() => {
    if (isGameEnd) {
      answers.forEach(({ row, completed }, index) => {
        if (completed && row.join("") === word) {
          switch (index) {
            case 0:
            case 1:
              message(ref.current[0]);
              break;
            case 2:
            case 3:
              message(ref.current[1]);
              break;
            default:
              message(ref.current[2]);
          }
        }
      });
    }
  }, [isGameEnd]);

  useEffect(() => {
    const count = answers.reduce(
      (acc, { row, completed }) =>
        (acc += completed && row.join("") !== word ? 1 : 0),
      0
    );

    if (count === 6) setTimeout(() => (ref.current[3].style.opacity = 1), 3500);
  }, [answers]);

  const messages = [
    "Таке можливо?",
    "Круто!!!",
    "Уух!!!",
    `Шкода. Загадане слово: ${
      isGameEnd ? word.toUpperCase() : "І немає чого підглядати в код ))"
    }`,
    "Не вистачає літер!",
    "Не знаю такого слова!",
  ];

  return (
    <div className="board">
      {messages.map((message, ind) => (
        <div
          key={message}
          ref={(el) => (ref.current[ind] = el)}
          className="message"
        >
          {message}
        </div>
      ))}

      {answers.map((el, ind) => (
        <Row
          key={ind}
          row={el.row}
          completed={el.completed}
          isShakeRow={isShakeRow}
          setIsShakeRow={setIsShakeRow}
          index={ind}
          answers={answers}
          refIDoNotKnow={ref.current[5]}
          refFewLetters={ref.current[4]}
          isDark={isDark}
        />
      ))}
    </div>
  );
};

export default Board;
