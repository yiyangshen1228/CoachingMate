/**
 * Created by Lingjun Meng on 15/4/2022
 */
const monthNames =["Jan","Feb","Mar","Apr",
  "May","Jun","Jul","Aug",
  "Sep", "Oct","Nov","Dec"];
export function getLocalTime(ts) {

  let date = new Date(parseInt(ts) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')
    .toString();
  let date2 = date.split("/")
  return date2[0] + " " + monthNames[parseInt(date2[1]) - 1] + " " + date2[2]

}


export function secondToDate(time) {
  let h = Math.floor(time / 3600);
  let m = Math.floor((time / 60 % 60));
  let s = Math.floor((time % 60));
  return h + ":" +(m + "").padStart(2, '0') + ":" + (s + "").padStart(2, '0');
}

export function generatePreviousWeekDate(){

  var date = new Date();
  var base = new Date(date).getTime();
  var oneDay = 24 * 3600 * 1000;
  var date = [];
  var data = [Math.random() * 300];
  var time = new Date(base);
  date.push([ time.getDate(), monthNames[time.getMonth()]].join(' '));
  for (var i = 1; i <7; i++) {//控制需要的天数
    var now = new Date(base -= oneDay); //这里控制往前一周还是往后一周
    // date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    date.push([now.getDate(), monthNames[now.getMonth()]].join(' '));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
  }
  generatePreviousMonthDate();

  return date.reverse()
}

export function generatePreviousMonthDate(){

  var date = new Date();
  var base = new Date(date).getTime();
  var oneMonth = 24 * 3600 * 1000 * 30;
  var date = [];
  var time = new Date(base);
  date.push([monthNames[time.getMonth()]].join(' '));
  for (var i = 1; i <3; i++) {//控制需要的月份数
    var now = new Date(base -= oneMonth); //这里控制往前一周还是往后一周
    // date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    date.push([monthNames[now.getMonth()]].join(' '));
  }

  return date.reverse()
}
