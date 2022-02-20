import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import axios from 'axios';
//components
import Title from './Title';
import Target from './Target';
import Result from './Result';
import Time from './Time';
import Board from './Board';
//style
import classNames from 'classnames/bind';
import styles from '../design/Home.module.scss';
const cx = classNames.bind(styles);

const Home = () => {
  //상태 받아오기
  const { gameState, rankLoading } = useSelector(
    ({ data }) => ({
      gameState: data.gameState,
      rankLoading: data.rankLoading,
    }),
    shallowEqual,
  );
  //return
  return (
    <div className={cx('area')}>
      <Title />
      <div className={cx('gameArea')}>
        {(gameState === -2 || gameState === 0) && (
          <div className={cx('info')}>
            {gameState === 0 ? <Target /> : <Result />}
            <Time />
          </div>
        )}
        <Board />
      </div>
      {gameState < 0 && !rankLoading && (
        <Link className={cx('ranking')} to="/ranking">
          Ranking
        </Link>
      )}
    </div>
  );
};

export default Home;
