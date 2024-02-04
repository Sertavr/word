import React, { useContext, useEffect, useRef } from "react";
import "../../style/cloud/cloud.css";
import { GiDrop } from "react-icons/gi";
import { AnswersContecst } from "../../App";
import { word } from "../../constants/word/Word";

const Clouds = ({ isGameEnd }) => {
  const ref = useRef();
    const rain = new Array(50).fill("");
    
  const answers = useContext(AnswersContecst);
  useEffect(() => {
    const count = answers.reduce(
      (acc, { row, completed }) =>
        (acc += completed && row.join("") !== word ? 1 : 0),
      0
    ); 

    if (count === 6) ref.current.style.opacity = isGameEnd && 1;
  }, [isGameEnd]);

  return (
    <div ref={ref} className={isGameEnd ? "container-anime" : 'beforeRain'}>
      <div className="cloud five"></div>
      <div className="cloud one"></div>
      <div className="cloud two"></div>
      <div className="cloud three"></div>
      <div className="cloud four"></div>
      {rain.map((_, ind) => (
        <div
          key={ind}
          className={isGameEnd ? 'rain' : 'beforeRain' }
          style={{
            left: `${Math.random() * window.innerWidth}px`,
            animationDuration: `${Math.random() * 0.5 + 1}s`,
          }}
        >
          <GiDrop style={{ color: "rgb(70, 105, 182)" }} />
        </div>
      ))}
    </div>
  );
};

export default Clouds;
