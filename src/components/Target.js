import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
//style
import classNames from "classnames/bind";
import styles from "../design/Target.module.scss";
const cx = classNames.bind(styles);

const Target = () => {
  //상태 받아오기
  const target = useSelector(({ board }) => board.target);
  //애니메이션
  const targetNumber = useRef(null);
  useEffect(() => {
    if (!targetNumber.current) return;
    targetNumber.current.animate(
      [
        { marginLeft: document.body.offsetWidth <= 425 ? "21.18vw" : "90px" },
        { marginLeft: "0px" },
      ],
      {
        duration: 300,
        easing: "cubic-bezier(.17,.99,.69,.97)",
        fill: "forwards",
      }
    );
  }, [target]);
  //return
  return (
    <div className={cx("box")}>
      <div className={cx("text")}>Next</div>
      <div className={cx("target")}>
        <div ref={targetNumber}>{target}</div>
      </div>
    </div>
  );
};

export default Target;
