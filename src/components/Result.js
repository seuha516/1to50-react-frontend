import React from "react";
import { shallowEqual, useSelector } from "react-redux";
//style
import classNames from "classnames/bind";
import styles from "../design/Result.module.scss";
const cx = classNames.bind(styles);

const Result = () => {
  //상태 받아오기
  const { rankLoading, newRecord } = useSelector(
    ({ data }) => ({
      rankLoading: data.rankLoading,
      newRecord: data.newRecord,
    }),
    shallowEqual
  );
  //공통 style
  const style = {
    opacity: rankLoading ? "0" : "1",
    fontSize: rankLoading && "0px",
    color: newRecord ? "rgb(255, 74, 74)" : "rgb(230, 255, 184)",
  };
  //return
  return newRecord ? (
    <div className={cx("result", "new")} style={style}>
      New Record!
    </div>
  ) : (
    <div className={cx("result")} style={style}>
      Result:
    </div>
  );
};

export default Result;
