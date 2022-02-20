import React from "react";
//style
import classNames from "classnames/bind";
import styles from "../design/Title.module.scss";
const cx = classNames.bind(styles);

const Title = () => {
  //return
  return <div className={cx("title")}>1 to 50</div>;
};

export default React.memo(Title, () => true);
