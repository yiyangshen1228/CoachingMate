
// 改变圆环比例
// var c1 = document.querySelector(".meter-1");
// c1.style.strokeDashoffset = (200-50)/200*360;


// 改变 load 数据
function changeLoadInfo(actualNum, planNum){
  var percentage = Math.round((actualNum / planNum) * 100) ;
  document.querySelector(".load-info").innerHTML = actualNum + " vs " + planNum;
  document.querySelector(".load-percent").innerHTML = percentage + "%";
  var loadCycle = document.querySelector(".meter-1");
  loadCycle.style.strokeDashoffset = (planNum-actualNum)/planNum*360;

}

// 改变 time 数据
function changeTimeInfo(actualNum, planNum){
  var percentage = Math.round((actualNum / planNum) * 100) ;
  document.querySelector(".time-info").innerHTML = actualNum + " vs " + planNum;
  document.querySelector(".time-percent").innerHTML = percentage + "%";
  var timeCycle = document.querySelector(".meter-2");
  timeCycle.style.strokeDashoffset = (planNum-actualNum)/planNum*360;

}

// 改变 distance 数据
function changeDistInfo(actualNum, planNum){
  var percentage = Math.round((actualNum / planNum) * 100) ;
  document.querySelector(".distance-info").innerHTML = actualNum + " vs " + planNum;
  document.querySelector(".distance-percent").innerHTML = percentage + "%";
  var distCycle = document.querySelector(".meter-3");
  distCycle.style.strokeDashoffset = (planNum-actualNum)/planNum*360;


}

// 改变 load 圆环比例(整合到 changeLoadInfo中了)

function changeLoadPercent(actualNum, planNum) {
  var loadCycle = document.querySelector(".meter-1");
  loadCycle.style.strokeDashoffset = (planNum-actualNum)/planNum*360;

}

// 需要改进: 如果超出目标的情况，用toggle() 加一个新的class
