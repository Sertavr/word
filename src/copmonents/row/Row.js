import React, { useEffect, useRef } from "react";
import Cell from "../cell/Cell";
import { words } from "../../constants/word/Word";

const Row = ({
  row,
  completed,
  answers,
  isShakeRow,
  setIsShakeRow,
  index,
  refIDoNotKnow,
  refFewLetters,
}) => {
  const refRow = useRef(null);

  let indexCompl = answers.findIndex(({ completed }) => completed === false);

  const shake = () => refRow.current.classList.add("shake");

  useEffect(() => {
    if (
      isShakeRow &&
      index === indexCompl &&
      !words.includes(answers[indexCompl].row.join(""))
    ) {
      if (answers[indexCompl].row.join('').length < 5) {
        shake();
        refFewLetters.style.opacity = 1;
        setTimeout(() => (refFewLetters.style.opacity = 0), 2000);
      } else {
        shake();
        refIDoNotKnow.style.opacity = 1;
        setTimeout(() => (refIDoNotKnow.style.opacity = 0), 2000);
      }
    }

    setIsShakeRow(false);
  }, [
    isShakeRow,
    index,
    indexCompl,
    setIsShakeRow,
    answers,
    refFewLetters,
    refIDoNotKnow,
  ]);

  const animationEnd = () => {
    if (index === indexCompl) refRow.current.classList.remove("shake");
  };

  return (
    <div className="row" ref={refRow} onAnimationEnd={animationEnd}>
      {row.map((text, ind) => (
        <div className="container-cell" key={ind}>
          <Cell
            text={text}
            index={ind}
            indexCompl={indexCompl}
            completed={completed}
            className="obverse"
            interval={100 + (ind % 5) * 700}
          />
          <Cell
            text={text}
            index={ind}
            indexCompl={indexCompl}
            completed={completed}
            className="reverse"
            interval={100 + (ind % 5) * 700}
          />
        </div>
      ))}
    </div>
  );
};

export default Row;
