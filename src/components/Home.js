import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import axios from "axios";
//components
import Title from "./Title";
import Target from "./Target";
import Result from "./Result";
import Time from "./Time";
import Board from "./Board";
//style
import classNames from "classnames/bind";
import styles from "../design/Home.module.scss";
const cx = classNames.bind(styles);

//서버 깨우기
let repeatLimit = 2;
const wakeUpServer = () => {
  console.log("서버 가동 요청을 보냈습니다.");
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/ranking/check`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      if (repeatLimit > 0) {
        console.log(`${repeatLimit}번 더 재시도합니다.`);
        repeatLimit--;
        wakeUpServer();
      } else {
        console.log("서버가 응답하지 않습니다.");
      }
    });
};

const Home = () => {
  //상태 받아오기
  const { gameState, rankLoading } = useSelector(
    ({ data }) => ({
      gameState: data.gameState,
      rankLoading: data.rankLoading,
    }),
    shallowEqual
  );
  //서버 깨우기
  useEffect(wakeUpServer, []);
  //return
  return (
    <div className={cx("area")}>
      <Title />
      <div className={cx("gameArea")}>
        {(gameState === -2 || gameState === 0) && (
          <div className={cx("info")}>
            {gameState === 0 ? <Target /> : <Result />}
            <Time />
          </div>
        )}
        <Board />
      </div>
      {gameState < 0 && !rankLoading && (
        <Link className={cx("ranking")} to="/ranking">
          Ranking
        </Link>
      )}
    </div>
  );
};

export default Home;
