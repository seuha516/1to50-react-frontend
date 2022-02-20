import axios from 'axios';
import { createAction, handleActions } from 'redux-actions';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { setBoardState, setLeftNumbers, setTarget } from './board';
import { pause, start, stop } from './timer';
import * as fn from '../utils/functions';
import * as sound from '../utils/sound';

//액션
const SET_NAME = 'data/SET_NAME';
const SET_GAME_STATE = 'data/SET_GAME_STATE';
const SET_RANK_LOADING = 'data/SET_RANK_LOADING';
const SET_NEW_RECORD = 'data/SET_NEW_RECORD';
const GAME_START = 'data/GAME_START';
const GAME_END = 'data/GAME_END';

//액션 생성 함수
export const setName = createAction(SET_NAME);
export const setGameState = createAction(SET_GAME_STATE);
export const setRankLoading = createAction(SET_RANK_LOADING);
export const setNewRecord = createAction(SET_NEW_RECORD);
export const gameStart = createAction(GAME_START);
export const gameEnd = createAction(GAME_END);

//API 요청
function postDataAPI(data) {
  return axios.post(`${process.env.REACT_APP_API_URL}/api/ranking/`, data);
}

//사가
function* gameStartSaga() {
  sound.countdownStart();
  yield put(stop());
  yield put(setBoardState(fn.setArray()));
  yield put(setTarget(1));
  yield put(setLeftNumbers(fn.setList(26, 50)));
  yield put(setGameState(3));
  for (let i = 2; i >= 0; i--) {
    yield delay(1000);
    yield put(setGameState(i));
  }
  yield put(start());
}
function* gameEndSaga() {
  sound.gameWin();
  yield put(pause());
  yield put(setGameState(-2));
  yield put(setRankLoading(true));
  const name = yield select((store) => store.data.name);
  const count = yield select((store) => store.timer.count);
  yield delay(500);
  let newname = name;
  if (newname === '' || newname === null) {
    newname = prompt('기록을 저장하려면 이름을 입력해 주세요.');
  }
  if (newname === '' || newname === null) {
    yield put(setRankLoading(false));
    return;
  }
  yield put(setName(newname));
  try {
    const response = yield call(postDataAPI, {
      name: newname,
      score: count / 1000,
      date: fn.get_date_str(new Date()),
    });
    yield put(setNewRecord(response.data));
  } catch (e) {
    alert('서버와 연결되지 않아 기록을 업로드하지 못했습니다.');
    yield put(setNewRecord(false));
  }
  yield put(setRankLoading(false));
}
export function* dataSaga() {
  yield takeLatest(GAME_START, gameStartSaga);
  yield takeLatest(GAME_END, gameEndSaga);
}

//초기 상태
const initialState = {
  name: null,
  gameState: -1, // 3 ~ 1 카운트, 0 게임중, -1 대기, -2 재시작대기
  rankLoading: false,
  newRecord: false,
};

//디스패치
const data = handleActions(
  {
    [SET_NAME]: (state, action) => ({
      ...state,
      name: action.payload,
    }),
    [SET_GAME_STATE]: (state, action) => ({
      ...state,
      gameState: action.payload,
    }),
    [SET_RANK_LOADING]: (state, action) => ({
      ...state,
      rankLoading: action.payload,
    }),
    [SET_NEW_RECORD]: (state, action) => ({
      ...state,
      newRecord: action.payload,
    }),
  },
  initialState,
);
export default data;
