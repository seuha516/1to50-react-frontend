import React, { useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { gameStart } from "../modules/data";
//style
import classNames from "classnames/bind";
import styles from "../design/Text.module.scss";
const cx = classNames.bind(styles);

const Text = () => {
  //상태 가져오기
  const dispatch = useDispatch();
  const { gameState, rankLoading } = useSelector(
    ({ data }) => ({
      gameState: data.gameState,
      rankLoading: data.rankLoading,
    }),
    shallowEqual
  );
  //애니메이션
  const Countdown = useRef(null);
  useEffect(() => {
    if (!Countdown.current) return;
    Countdown.current.animate(
      [
        { fontSize: document.body.offsetWidth <= 425 ? "35.29vw" : "150px" },
        { fontSize: "0px" },
      ],
      {
        duration: 750,
        easing: "cubic-bezier(.66,.11,1,-0.08)",
        fill: "forwards",
      }
    );
  }, [gameState]);
  //return
  return (
    <>
      {gameState === -1 ? (
        <div
          className={cx("startButton")}
          onClick={() => {
            dispatch(gameStart());
          }}
        >
          START
        </div>
      ) : gameState > 0 ? (
        <div ref={Countdown} className={cx("countdown")}>
          {gameState}
        </div>
      ) : (
        gameState === -2 &&
        (rankLoading ? (
          <div className={cx("loading")}>Loading...</div>
        ) : (
          <div
            className={cx("startButton", "re")}
            onClick={() => dispatch(gameStart())}
          >
            Restart
          </div>
        ))
      )}
    </>
  );
};

export default Text;
