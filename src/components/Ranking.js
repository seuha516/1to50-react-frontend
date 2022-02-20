import React, { useCallback, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
//components
import Title from "./Title";
//style
import classNames from "classnames/bind";
import styles from "../design/Ranking.module.scss";
const cx = classNames.bind(styles);

const Ranking = ({ history }) => {
  //상태 관리
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  //랭킹 불러오기
  const loadList = useCallback(async () => {
    console.log("랭킹 요청 보냄");
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/ranking/list`)
      .then((res) => {
        console.log(res.data);
        setList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("랭킹 로드 중 오류 발생", err);
        alert("서버에 연결할 수 없습니다.");
        history.push("/");
      });
  }, [history]);
  useEffect(() => {
    loadList();
  }, [loadList]);
  //return
  return (
    <div className={cx("area")}>
      {loading ? (
        <div className={cx("loading")}>Loading...</div>
      ) : (
        <>
          <div className={cx("titleArea")}>
            <Link to="/">
              <Title />
            </Link>
            <div className={cx("text")}>Ranking</div>
          </div>
          <div className={cx("rankingArea")}>
            {list.map((data, index) => (
              <div key={data._id} className={cx("rankingData")}>
                <div>{index + 1}</div>
                <div>
                  <div>
                    <div>{data.name}</div>
                    <div>{`${data.score}s`}</div>
                  </div>
                  <div>{data.date}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default withRouter(Ranking);
