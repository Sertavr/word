import React from "react";
import Key from "./Key";
import "../../style/keyBoard/keyBoard.css";
import { words } from "../../constants/word/Word";

const KeyBoard = ({ answers, setAnswers, setIsShakeRow, isGameEnd }) => {
  const letter = [
    ["'", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ї"],
    ["ф", "і", "в", "а", "п", "р", "о", "л", "д", "ж", "є"],
    ["enter", "ґ", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "del"],
  ];

  

  const copyAnswerc = (answ) => {
    const answersStr = JSON.stringify(answ);
    const newAnswers = JSON.parse(answersStr);
    return newAnswers;
  };

  const hendlerOnClickAdd = (letter) => {
    if (isGameEnd) return;
    const newAnswers = copyAnswerc(answers);

    let index = newAnswers.findIndex(({ completed }) => completed === false);

    if (index !== -1) {
      let indEmpty = newAnswers[index].row.findIndex((el) => el === "");
      if (indEmpty !== -1) newAnswers[index].row[indEmpty] = letter;
    }
    setAnswers(newAnswers);
  };

  const hendlerOnClickBackspace = () => {
    setAnswers((previousAnswers) => {
      const newAnswers = copyAnswerc(previousAnswers);

      let index = newAnswers.findIndex(({ completed }) => completed === false);

      if (index !== -1) {
        let lastIndex = newAnswers[index].row.findLastIndex((el) => el !== "");
        newAnswers[index].row[lastIndex] = "";
      }
      return newAnswers;
    });
  };

  const hendlerOnClickCheck = () => {
    if (isGameEnd) return;
    const newAnswers = copyAnswerc(answers);
    let index = newAnswers.findIndex(({ completed }) => completed === false);
    if (
      index !== -1 &&
      !newAnswers[index].row.includes("") &&
      words.includes(newAnswers[index].row.join(""))
    )
      newAnswers[index].completed = true;

    if (
      newAnswers[index].row.join("").length < 5 ||
      !words.includes(answers[index].row.join(""))
    )
      setIsShakeRow(true);

    setAnswers(newAnswers);
  };

  return (
    <div className="key-board">
      {letter.map((rowKey, ind) => (
        <div className="rowKeyBoard" key={ind}>
          {rowKey.map((lett) => (
            <Key
              key={lett}
              valueKey={lett.toUpperCase()}
              handlerAdd={() => hendlerOnClickAdd(lett)}
              backspace={hendlerOnClickBackspace}
              check={hendlerOnClickCheck}
            />
          ))}
        </div>
      ))}

    </div>
  );
};
export default KeyBoard;
