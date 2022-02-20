// 1~25의 숫자를 섞어 만든 5*5 배열 반환
export const setArray = () => {
  let list = setList(1, 25);
  let arr = new Array(5);
  for (let i = 0; i < 5; i++) {
    arr[i] = new Array(5);
    for (let j = 0; j < 5; j++) {
      let nextnum;
      [nextnum, list] = findnextnum(list);
      arr[i][j] = {
        id: i * 5 + j,
        value: nextnum,
      };
    }
  }
  return arr;
};
// start~end 리스트 반환
export const setList = (start, end) => {
  let list = [];
  for (let i = start; i <= end; i++) {
    list.push(i);
  }
  return list;
};
// 리스트에서 뽑은 수, 뽑고 난 뒤 리스트 반환
export const findnextnum = (list) => {
  if (list.length === 0) {
    return ["", []];
  }
  let index = Math.floor(Math.random() * list.length);
  let nextnum = list[index];
  list.splice(index, 1);
  return [nextnum, list];
};
// time을 초, 소수점으로 반환
export const makeTimer = (time) => {
  const format = (num) => (num < 10 ? `0${num}` : String(num));
  const sec_front = Math.floor(time / 1000);
  const sec_back = Math.floor((time - sec_front * 1000) / 10);
  return [format(sec_front), format(sec_back)];
};
// 현재 시간 문자열 반환
export const get_date_str = () => {
  const date = new Date();
  let sYear = date.getFullYear() % 100;
  let sMonth = date.getMonth() + 1;
  let sDate = date.getDate();
  let sHour = date.getHours();
  let sMin = date.getMinutes();
  sMonth = sMonth > 9 ? sMonth : "0" + sMonth;
  sDate = sDate > 9 ? sDate : "0" + sDate;
  sHour = sHour > 9 ? sHour : "0" + sHour;
  sMin = sMin > 9 ? sMin : "0" + sMin;
  return `${sYear}.${sMonth}.${sDate} ${sHour}:${sMin}`;
};
