import React, { useCallback, useContext, useEffect, useRef } from "react";
import "../../style/cell/cell.css";
import { AnswersContecst } from "../../App";
import { word } from "../../constants/word/Word";

const Cell = ({ text, index, completed, className, interval, setInt }) => {
  const answers = useContext(AnswersContecst);
  const ref = useRef();

  useEffect(() => {
    ref.current.classList.add("cell");
    if (ref.current.textContent) {
      ref.current.classList.add("active");
    } else {
      ref.current.classList.remove("active");
    }
  }, [answers]);
const rotation = useCallback (() => {
  setTimeout(() => {
    if (ref.current.className.split(" ").includes("reverse")) {
      ref.current.style.transform = "rotateX(0deg)";
    }
    if (ref.current.className.split(" ").includes("obverse")) {
      ref.current.style.transform = "rotateX(180deg)";
    }
  }, interval);  
}, [interval] )
  
  useEffect(() => {
    if(completed){
    if (text === word[index]) {
      ref.current.classList.add("correct");
      }
    if (text !== word[index] && word.split("").includes(text)) {
      ref.current.classList.add("present");
      
    }
    if (!word.split("").includes(text)) {
      ref.current.classList.add("absent");
      }
      if (
        text !== word[index] &&
        word.split("").includes(text) &&
        word.split("").findLastIndex((el) => el === text) !==
          word.split("").findIndex((el) => el === text)
      ) {
        ref.current.classList.add("present");
      }
        rotation();
    }
  }, [completed, text, index, rotation]);

  return (
    <div className={className} ref={ref}>
      {text}
    </div>
  );
};

export default Cell;
