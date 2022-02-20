import { all, fork } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import data, { dataSaga } from './data';
import timer, { timerSaga } from './timer';
import board from './board';

const rootReducer = combineReducers({
  data,
  board,
  timer,
});
export function* rootSaga() {
  yield all([fork(dataSaga), fork(timerSaga)]);
}

export default rootReducer;
