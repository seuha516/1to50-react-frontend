import React from "react";
import { shallowEqual, useSelector } from "react-redux";
//components
import Cell from "./Cell";
import Text from "./Text";
//style
import classNames from "classnames/bind";
import styles from "../design/Board.module.scss";
const cx = classNames.bind(styles);

const Board = () => {
  //상태 가져오기
  const { gameState, boardState } = useSelector(
    ({ data, board }) => ({
      gameState: data.gameState,
      boardState: board.boardState,
    }),
    shallowEqual
  );
  //return
  return (
    <div className={cx("board")}>
      {gameState === 0 ? (
        <ul>
          {boardState.map((line) => (
            <ul className={cx("line")}>
              {line.map((cell) => (
                <Cell key={cell.id} value={cell.value} />
              ))}
            </ul>
          ))}
        </ul>
      ) : (
        <Text />
      )}
    </div>
  );
};

export default Board;
