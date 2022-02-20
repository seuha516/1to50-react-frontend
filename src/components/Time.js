import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import * as fn from "../utils/functions";
//style
import classNames from "classnames/bind";
import styles from "../design/Time.module.scss";
const cx = classNames.bind(styles);

const Time = () => {
  //상태 받아오기
  const { gameState, count } = useSelector(
    ({ data, timer }) => ({
      gameState: data.gameState,
      count: timer.count,
    }),
    shallowEqual
  );
  const [min, sec] = fn.makeTimer(count);
  //return
  return (
    <div
      className={cx("time", gameState === -2 && "restart")}
    >{`${min}.${sec}`}</div>
  );
};

export default Time;
