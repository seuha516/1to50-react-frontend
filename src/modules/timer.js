import { createAction, handleActions } from "redux-actions";
import {
  all,
  call,
  cancel,
  delay,
  flush,
  fork,
  put,
  race,
  select,
  take,
  takeEvery,
} from "redux-saga/effects";
import { eventChannel, buffers } from "redux-saga";

export const START = "timer/START";
export const PAUSE = "timer/PAUSE";
export const STOP = "timer/STOP";
export const WATCH = "timer/WATCH";
export const RESTART = "timer/RESTART";
export const SET_STATUS = "timer/SET_STATUS";
export const SET_COUNT = "timer/SET_COUNT";

export const start = createAction(START);
export const watch = createAction(WATCH);
export const pause = createAction(PAUSE);
export const stop = createAction(STOP);
export const restart = createAction(RESTART);
export const setStatus = createAction(SET_STATUS);
export const setCount = createAction(SET_COUNT);

function subscribe(param) {
  const { buffer, timer } = param;
  return eventChannel((emit) => {
    const iv = setInterval(() => {
      emit(+timer);
    }, timer);
    return () => {
      clearInterval(iv);
    };
  }, buffer || buffers);
}
function* connectChannel() {
  let channel;
  try {
    const timer = 10;
    const buffer = buffers.sliding(1);
    const param = { buffer, timer };
    channel = yield call(subscribe, param);
    let timeTemp = null; //이전 시각
    while (true) {
      let now = Date.now(); //현재 시각
      let interval = timeTemp ? now - timeTemp : 0;
      timeTemp = now;
      yield flush(channel);
      const count = yield select((state) => state.timer.count);
      yield put(setCount(count + interval));
      // eslint-disable-next-line no-unused-vars
      const { timeout, pauseStatus } = yield race({
        timeout: delay(timer),
        pauseStatus: take(pause),
      });
      if (pauseStatus) {
        yield put(setStatus("pause"));
        timeTemp = null;
        yield take(restart);
        yield put(setStatus("play"));
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (channel) channel.close();
  }
}

function* startSaga() {
  yield put(watch());
}
function* watcherSaga() {
  while (yield take(watch)) {
    try {
      yield put(setStatus("play"));
      const worker = yield fork(connectChannel);
      yield take(stop);
      yield cancel(worker);
    } catch (error) {
      console.error(error);
    } finally {
      yield all([put(setStatus("stop")), put(setCount(0))]);
    }
  }
}
export function* timerSaga() {
  yield takeEvery(start, startSaga);
  yield fork(watcherSaga);
}

const initialState = {
  status: "stop",
  count: 0,
};

const status = handleActions(
  {
    [SET_STATUS]: (state, action) => {
      const status = action.payload;
      return { ...state, status };
    },
    [SET_COUNT]: (state, action) => {
      const count = action.payload;
      return { ...state, count };
    },
  },
  initialState
);

export default status;
