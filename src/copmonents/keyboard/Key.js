import React, { useContext, useEffect, useRef } from "react";
import { TiBackspaceOutline } from "react-icons/ti";
import { AiOutlineEnter } from "react-icons/ai";
import { AnswersContecst } from "../../App";
import { word } from "../../constants/word/Word";

const Key = ({ valueKey, handlerAdd, backspace, check }) => {
  const answers = useContext(AnswersContecst);
  const refKey = useRef();

  
  useEffect(() => {
    const stylizationKey = (letter, className) => {
      return (
        letter === refKey.current.textContent.toLowerCase() &&
        refKey.current.classList.add(className)
      );
    };

    const indexLastTrue = answers.findLastIndex(
      ({ completed }) => completed === true
    );
    setTimeout(() => {
      answers[indexLastTrue]?.row.forEach((el, index) => {
        if (el !== word.at(index) && word.split("").includes(el)) {
          !refKey.current.className.split(" ").includes("correct-key") &&
            stylizationKey(el, "present-key");
        }
        if (!word.split("").includes(el)) {
          stylizationKey(el, "absent-key");
        }
        if (el === word.at(index)) {
          stylizationKey(el, "correct-key");
          refKey.current.classList.remove("present-key");
        }
      });
    }, 3100);
  }, [answers]);

  const style = {
    padding: "3px 12px",
    fontSize: "25px",
  };

  return (
    <div
      ref={refKey}
      className="key"
      onClick={() =>
        valueKey === "DEL"
          ? backspace()
          : valueKey === "ENTER"
          ? check()
          : handlerAdd(valueKey)
      }
    >
      {valueKey === "DEL" ? (
        <TiBackspaceOutline style={style} />
      ) : valueKey === "ENTER" ? (
        <AiOutlineEnter style={style} />
      ) : (
        valueKey
      )}
    </div>
  );
};

export default Key;
