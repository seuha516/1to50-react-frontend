import { createAction, handleActions } from 'redux-actions';

//액션
const SET_BOARD_STATE = 'board/SET_BOARD_STATE';
const SET_TARGET = 'board/SET_TARGET';
const SET_LEFT_NUMBERS = 'board/SET_LEFT_NUMBERS';

//액션 생성 함수
export const setBoardState = createAction(SET_BOARD_STATE);
export const setTarget = createAction(SET_TARGET);
export const setLeftNumbers = createAction(SET_LEFT_NUMBERS);

//초기 상태
const initialState = {
  boardState: null,
  target: null,
  leftNumbers: null,
};

const board = handleActions(
  {
    [SET_BOARD_STATE]: (state, action) => ({
      ...state,
      boardState: action.payload,
    }),
    [SET_TARGET]: (state, action) => ({
      ...state,
      target: action.payload,
    }),
    [SET_LEFT_NUMBERS]: (state, action) => ({
      ...state,
      leftNumbers: action.payload,
    }),
  },
  initialState,
);
export default board;
