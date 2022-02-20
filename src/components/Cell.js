import React, { useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setBoardState, setTarget, setLeftNumbers } from "../modules/board";
import { gameEnd } from "../modules/data";
import * as fn from "../utils/functions";
import * as sound from "../utils/sound";
//style
import classNames from "classnames/bind";
import styles from "../design/Cell.module.scss";
const cx = classNames.bind(styles);

//애니메이션
const clickCorrectCell = (object) => {
  sound.correctbuttonClick();
  object.animate(
    [
      { fontSize: "0px", backgroundColor: "rgba(110, 255, 122, 0.541)" },
      { backgroundColor: "rgba(110, 255, 122, 0)" },
    ],
    {
      duration: 600,
      easing: "cubic-bezier(.19,.91,.29,.95)",
      fill: "forwards",
    }
  );
};
const clickWrongCell = (object) => {
  sound.wrongbuttonClick();
  object.animate(
    [
      { backgroundColor: "rgba(238, 78, 78, 0)" },
      { backgroundColor: "rgba(238, 78, 78, 0.705)" },
      { backgroundColor: "rgba(238, 78, 78, 0)" },
    ],
    {
      duration: 500,
      easing: "cubic-bezier(.32,.86,.73,.19)",
      fill: "forwards",
    }
  );
};

const Cell = ({ value }) => {
  //상태 가져오기
  const dispatch = useDispatch();
  const { boardState, target, leftNumbers } = useSelector(
    ({ board }) => ({
      boardState: board.boardState,
      target: board.target,
      leftNumbers: board.leftNumbers,
    }),
    shallowEqual
  );
  //셀 클릭
  const onClick = (e) => {
    if (e.target.textContent === "") return;
    if (e.target.textContent === String(target)) {
      if (target === 50) {
        dispatch(gameEnd());
        return;
      }
      let [nextNumber, nextLeftNumbers] = fn.findnextnum(leftNumbers);
      dispatch(setTarget(target + 1));
      dispatch(setLeftNumbers(nextLeftNumbers));
      dispatch(
        setBoardState(
          boardState.map((line) =>
            line.map((cell) =>
              cell.value === target ? { id: cell.id, value: nextNumber } : cell
            )
          )
        )
      );
    } else {
      clickWrongCell(e.target);
    }
  };
  //애니메이션
  const newCell = useRef(null);
  useEffect(() => {
    if (target > 1) clickCorrectCell(newCell.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  //return
  return (
    <div className={cx("cell")} ref={newCell} onClick={onClick}>
      {value}
    </div>
  );
};

export default React.memo(Cell);
