import countdown from "../sound/countdown.wav";
import wrongbutton from "../sound/wrongbutton.mp3";
import correctbutton from "../sound/correctbutton.mp3";
import win from "../sound/win.mp3";

export const countdownStart = () => {
  let audiofile = new Audio(countdown);
  audiofile.play();
};
export const wrongbuttonClick = () => {
  let audiofile = new Audio(wrongbutton);
  audiofile.play();
};
export const correctbuttonClick = () => {
  let audiofile = new Audio(correctbutton);
  audiofile.play();
};
export const gameWin = () => {
  let audiofile = new Audio(win);
  audiofile.play();
};
