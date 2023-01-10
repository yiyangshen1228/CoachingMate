import React, {useLayoutEffect} from "react";
import {Avatar, Modal, Button, Image, Row, Col, message, Switch} from "antd";
import "./index.less";
import { Spin, Space } from 'antd';
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import RaddarChart from "./components/RaddarChart";
import PieChart from "./components/PieChart";
import TransactionTable from "./components/TransactionTable";
import BoxCard from "./components/BoxCard";
import {getAccessToken} from "../../utils/auth";
import {requestToken} from '@/api/auth'
import store from "@/store";
// import { login, getUserInfo } from "@/store/actions";
import {getToken} from "@/utils/auth"
import {login, getUserInfo} from "@/store/actions";
import {getDashboardStatisticsByAccessToken} from "@/api/activity"

///////////////////////进度圆圈/////////////////
import ProgressChart from "./components/ProgressChart";
///////////////////////Up Coming Tasks/////////////////
import ToDoApp from "./components/ToDo";
///////////////////////tss vs colories line chart/////////////////
import ColoriesLineChart from "./components/ColoriesLineChart";
import RingScore from "./components/RingScore";
///////////////////////database/////////////////
import { targets } from "./components/DataBase/target.js";
import { tasks } from "./components/DataBase/tasks.js";

const defaultData = {
  "userAccessToken": "889f8e7f-9993-4e05-964f-445d4198bb72",
  "ttlActivityTimes": 1000,
  "ttlRunningTimes": 700,
  "ttlRiddingTimes": 200,
  "ttlSwimmingTimes": 100,
  "ttlActivityTime": 831,
  "ttlRunningTime": 78,
  "ttlRiddingTime": 738,
  "ttlSwimmingTime": 15,
  "allActivityTime": null,
  "runningActivityTime": null,
  "swimmingActivityTime": null,
  "riddingActivityTime": null,
  "activityTimeChartMap": {
    "RiddingTime": {
      "actual": [100, 120, 161, 134, 105, 160, 165],
      "except": [120, 82, 91, 154, 162, 140, 145]
    },
    "AllTime": {
      "actual": [200, 192, 120, 144, 160, 130, 140],
      "except": [180, 160, 151, 106, 145, 150, 130]
    },
    "SwimmingTime": {
      "actual": [80, 100, 121, 104, 105, 90, 100],
      "except": [120, 90, 100, 138, 142, 130, 130]
    },
    "RunningTime": {
      "actual":  [130, 140, 141, 142, 145, 150, 160],
      "except": [120, 82, 91, 154, 162, 140, 130]
    }
  },
  "radarActivities": {
    "RUNNING": {
      "time": 78,
      "calories": 1011,
      "distance": 14009.34,
      "avgSpeed": 179.60692307692307,
      "peakSpeed": 4.255,
      "avgHeartRate": 158
    },
    "OPEN_WATER_SWIMMING": {
      "time": 15,
      "calories": 152,
      "distance": 895.11,
      "avgSpeed": 59.674,
      "peakSpeed": 22.562,
      "avgHeartRate": 142
    },
    "ROAD_BIKING": {
      "time": 738,
      "calories": 6697,
      "distance": 236205.5,
      "avgSpeed": 320.06165311653115,
      "peakSpeed": 0,
      "avgHeartRate": 155
    }
  },
  "hearRateZones": [
    [100, 100, 100, 100, 100],
    [100, 100, 100, 100, 100],
    [100, 100, 100, 100, 100],
    [100, 100, 100, 100, 100],
    [100, 100, 100, 100, 100],
    [100, 100, 100, 100, 100],
    [100, 100, 100, 100, 100]
  ]
}
const Dashboard = () => {

  // const [lineChartData, setLineChartData] = useState(
  //   lineChartDefaultData["All Activities"]
  // );
  let [lineChartData, setLineChartData] = React.useState( {
    "actual": [100, 120, 161, 134, 105, 160, 165],
    "except": [120, 82, 91, 154, 162, 140, 145]
  });

  // Target dummy data
  let [progressChartData, setProgressChartData] = React.useState({
    "actualTime":1000,
    "targetTime":20,
    "actualCalories":8000,
    "targetCalories":10000,
    "actualDistance": 100000,
    "targetDistance": 150
  });

  // Pre-Tasks dummy data
  // let preTask = [["running 3km"], ["swimming 2km"], ["karaoke"]];
  let preTask = tasks;
  let heartData;

  // tss and calories dummy data
  let [lineChartCaloriesData, setLineChartCaloriesData] = React.useState( {
    "actual": [12, 15, 20, 19, 19, 20, 20],
    
    "tss": [19, 19, 19, 19, 19, 19, 19]
  });

  let [heartRateZones, setHeartRateZones] = React.useState( false);
  let [allLineChartData, setAllLineChartData] = React.useState(false);
  let [dashboardData, setDashboardData] = React.useState(false);
  // let [allProgressChartData, setAllProgressChartData] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [subVisible, setSubVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');
  let allProgressChartData;
  let allHeartData;

  const [bikeHeart, setBikeHeart] = React.useState(0);
  const [runHeart, setRunHeart] = React.useState(0);
  const [swimHeart, setSwimHeart] = React.useState(0);

  const {user} = store.getState()
  const token = getToken()
  // console.log(user)
  const showModal = () => {
    setVisible(true);
  };

  const showSubModal = () => {
    setSubVisible(true);
  };
  
  const handleConnect = () => {
    setModalText('The modal will be closed after two seconds');
    requestToken({username: user.username}).then(response => {
      setSubVisible(true)
      const data = response.data

      
      window.open(data.url)
    }).catch(error => {

      }
    )

    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setVisible(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };

  const handleCancel = () => {
    // console.log('Clicked cancel button');
    setVisible(false);
  };

  const handleHaveConnected = () => {
    setSubVisible(false);
    setVisible(false);
    // console.log(token)
    window.location.reload()
  };
  const handleCancelConnected = () => {
    setSubVisible(false);
    setVisible(false);
  };
  // const {props} = props
  // console.log("getUserInfo")
  

  const handleSetLineChartData = (type) => {
    // console.log("被点击的运动是-->", type);
    setLineChartData(allLineChartData[type]);
  }

  ///////////////////要解决type的问题////////////////////////
  const handleSetProgressChartData=(type)=>{
    // let activityType = "";
    // if(type === "RiddingTime"){
    //   activityType = "ROAD_BIKING"
    // }
    
    // console.log("被点击的运动是-->", type);
    let activityType = "";
    if(type === "RiddingTime"){
      // const progressData = allProgressChartData["ROAD_BIKING"];
      activityType = "ROAD_BIKING"
      // console.log(progressData);
    }else if((type === "SwimmingTime")){
      activityType = "OPEN_WATER_SWIMMING"
    }else{
      activityType = "RUNNING"
    }
    // console.log("-----------被点击的所有数据----->",dashboardData.radarActivities);
    const activityProgress = dashboardData.radarActivities[activityType];
    const targetObj = targets[activityType];
    
    // console.log("----handleSetProgressChartData----中的属性值", activityProgress);
    const newProgress = {
      // ...progressChartData,
      // 从databse中获取target 数据
      ...targetObj,
      // 时间单位:小时，保留2位小数
      actualTime: activityProgress.time,
      actualCalories: activityProgress.calories,
      actualDistance: activityProgress.distance
    }
    setProgressChartData(newProgress)
  }

  
  const tssScore=(heartRatio) =>{
    if(heartRatio >=0 && heartRatio <= 0.56){
      return heartRatio * 20
    }else if(heartRatio > 0.56 && heartRatio <= 0.63){
      return heartRatio * 30
    } else if(heartRatio > 0.63 && heartRatio <= 0.75){
      return heartRatio * 40
    } else if(heartRatio > 0.75 && heartRatio <= 0.85){
      return heartRatio * 60
    } else if(heartRatio > 0.85 && heartRatio <= 0.9){
      return heartRatio * 80
    } else {
      return heartRatio * 100
    }

  }
  /////////////////////////get single day tss////////////////////////
  const setSingleTss = () =>{
    
    // heartData = dashboardData.hearRateZones
    console.log("----->heartData", allHeartData);
    let actualTss = [];
    let MaxTss = [19,19,19,19,19,19,19];

    for(var i=6;i>=0; i--){
      var sum= 0;
      var minute = 0;
      
      const heartLevel = [106,124,141,159,160]
      for(var j=0; j<5;j++){

        sum += allHeartData[i][j]*heartLevel[j];
        minute += allHeartData[i][j]


        
      }
      if(minute === 0){
        actualTss.push(0)
      }else{
        var per = sum/minute/160
        // actualTss.push(tssScore((sum/minute)/160))
        actualTss.push(tssScore(per))
      }
      // console.log("i===",i, " 一天内的心率时间---->",minute);
      // console.log("i===",i, " 一天内的平均心率---->",sum);
      
    }
    console.log("----->actualTSS", actualTss);
    setLineChartCaloriesData({
      actual:actualTss,
      tss: MaxTss
      
    })

    



    // lineChartCaloriesData = {
    //   actual:[],
    //   tss:[]
    // }

  }

  

  // const handleSetProgressChartData = (type) => {
    
  //   setProgressChartData(progressChartData[type]);
  // }
  // console.log(userAccessToken)
  let userAccessToken = getAccessToken()
  // let userAccessToken = "getAccessToken()"
  // console.log(userAccessToken)
  const fetchDashboardData = () => {
    if (userAccessToken === undefined || userAccessToken === "" || userAccessToken === 'null') {

    } else {
      getDashboardStatisticsByAccessToken({accessToken: userAccessToken}).then(response => {
        let data = response.data
        console.log("我的data是是是是是 = ", response);
        if(response.data === null){
          response.data = defaultData
          
        }
        setDashboardData(response.data)
        // setLineChartData(response.data.activityTimeChartMap)
        setAllLineChartData(response.data.activityTimeChartMap)
        setHeartRateZones(response.data.hearRateZones)
        console.log("这是 heartRateZonesdata----->",response.data.hearRateZones);
        allHeartData = response.data.hearRateZones;
        setLineChartData( response.data.activityTimeChartMap["AllTime"])
        setHeartRateZones(response.data.hearRateZones)

        ////////////所有radar数据////////////
        allProgressChartData = response.data.radarActivities
        ////////////所有heart zone 数据////////////
        // allHeartData = response.data.hearRateZones
        // console.log("---------------allProgressChartData------>", allProgressChartData);
        // // console.log("这是六边形战士radar data----->",progressChartData);
        // console.log("RUNNING六边形--------->",response.data.radarActivities["RUNNING"]);
        setBikeHeart(tssScore((response.data.radarActivities["ROAD_BIKING"].avgHeartRate/180).toFixed(2)));
        setSwimHeart(tssScore((response.data.radarActivities["OPEN_WATER_SWIMMING"].avgHeartRate/151).toFixed(2)));
        setRunHeart (tssScore((response.data.radarActivities["RUNNING"].avgHeartRate/121).toFixed(2)));
        console.log("------heart--------->",  bikeHeart);
        console.log("------heart--------->",  swimHeart);
        console.log("------heart--------->",  runHeart);
        setLineChartCaloriesData(setSingleTss);
        // console.log("------TSS曲线图--------->",lineChartCaloriesData);
        setLoading(false);

      }).catch(error => {

      })

    }
    
  }

  // console.log("-------7天的心率数据----->",allHeartData);

  
  
  useLayoutEffect(() => {
    fetchDashboardData()
  }, [])
  if (userAccessToken === undefined || userAccessToken === "" || userAccessToken === 'null') {
    return (

      <div className="dashboard-visitor-container">
        <div>
          <Avatar size={150}
                  src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"/>
          <span className="display_name">User</span>
          <Button className="connect_garmin_button" onClick={showModal} type="primary">Connect to Garmin</Button>
          {/*  <span style="font-size:20px;padding-top:20px;display:inline-block;">*/}
          {/*    <Button type="primary">Connect to Garmin</Button>*/}
          {/*</span>*/}
        </div>
        <div>
          <img src={"https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3"}/>
        </div>
        <Modal
          title=""
          visible={visible}
          onOk={handleConnect}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okText="Sure, connect now!"
          cancelText="No, will try later!"
        >
          <p>Would you like to give permission to your Garmin Connect account? If we cannot connect to your Garmin
            account,
            this may affect your experience.</p>
        </Modal>
        <Modal
          title=""
          visible={subVisible}
          onOk={handleHaveConnected}
          confirmLoading={confirmLoading}
          onCancel={handleCancelConnected}
          cancelText="Connected with error"
          okText="I have connected."
        >
          <p>{modalText}</p>
        </Modal>
      </div>

    )
  }


 

  if (!dashboardData) {
    console.log(dashboardData)
    //
    // lineChartData = dashboardData.activityTimeChartMap["AllTime"]
    // heartRateZones = dashboardData.hearRateZones
  }
  

  return (
    !dashboardData?<Space className="wait-for-data" size="middle">
        <Spin size="large" />
      </Space>:
    <div className="app-container">
      {/*<a*/}
      {/*  href="https://github.com/NLRX-WJC/react-antd-admin-template"*/}
      {/*  target="_blank"*/}
      {/*  rel="noopener noreferrer"*/}
      {/*  className="github-corner"*/}
      {/*></a>*/}

      {/* <PanelGroup data={{
        ttlActivityTimes: dashboardData.ttlActivityTimes,
        ttlRunningTimes: dashboardData.ttlRunningTimes,
        ttlRiddingTimes: dashboardData.ttlRiddingTimes,
        ttlSwimmingTimes: dashboardData.ttlSwimmingTimes
      }} handleSetLineChartData={handleSetLineChartData}/> */}
 
      <PanelGroup 
      data={{
        ttlActivityTimes: dashboardData.ttlActivityTimes,
        ttlRunningTimes: dashboardData.ttlRunningTimes,
        ttlRiddingTimes: dashboardData.ttlRiddingTimes,
        ttlSwimmingTimes: dashboardData.ttlSwimmingTimes
      }} 
      handleSetLineChartData={handleSetLineChartData}
      handleSetProgressChartData = {handleSetProgressChartData}
      />

      <Row gutter={32}>
      <Col xs={24} sm={24} lg={8}>
        
        <div className="chart-wrapper">
        <h2>Time(hours)</h2>
        <ProgressChart 
        colour="blue" 
        percentage={(progressChartData.actualTime/60)/progressChartData.targetTime*100}     
        progressdata = {(progressChartData.actualTime/60).toFixed(2)}
        targetdata = {progressChartData.targetTime}
        
        
        />
        </div>
      </Col>


      <Col xs={24} sm={24} lg={8}>
        
        <div className="chart-wrapper">
        <h2>Calories</h2>
        <ProgressChart colour="green"
        percentage={progressChartData.actualCalories/progressChartData.targetCalories*100} 
        
        progressdata = {progressChartData.actualCalories}
        targetdata = {progressChartData.targetCalories}
        />
        </div>
      </Col>


      <Col xs={24} sm={24} lg={8}>
        <div className="chart-wrapper">
        <h2>Distance(KM)</h2>
        <ProgressChart colour="yellow" 
        percentage={(progressChartData.actualDistance/1000).toFixed(2)/progressChartData.targetDistance*100} 
        
        progressdata = {(progressChartData.actualDistance/1000).toFixed(2)}
        targetdata = {progressChartData.targetDistance} 
        />
        </div>
      </Col>
      </Row>

      
      <LineChart
        chartData={lineChartData}
        styles={{
          padding: 12,
          backgroundColor: "#fff",
          marginBottom: "25px",
        }}
      />

      <ColoriesLineChart
        chartData={lineChartCaloriesData}
        styles={{
          padding: 12,
          backgroundColor: "#fff",
          marginBottom: "25px",
        }}
      />

      {/* <Row gutter={32}>
      <Col xs={24} sm={24} lg={8}>
        <div className="chart-wrapper">
        <h2>TSS Score</h2>
        <RingScore
        />
        </div>
      </Col>
      </Row> */}




      <Row gutter={32}>

        <Col xs={24} sm={24} lg={8}>
          <div className="chart-wrapper">
            <RingScore 
            percentage = {{cycling: bikeHeart, swimming: swimHeart, running: runHeart}}
           
            
            />
            
          </div>
        </Col>

        <Col xs={24} sm={24} lg={8}>
          <div className="chart-wrapper">
            <PieChart data={{
              ttlRiddingTime: dashboardData.ttlRiddingTime,
              ttlRunningTime: dashboardData.ttlRunningTime,
              ttlSwimmingTime: dashboardData.ttlSwimmingTime
            }}/>
          </div>
        </Col>

        <Col xs={24} sm={24} lg={8}>
          <div className="chart-wrapper">
            <BarChart data={heartRateZones}/>
          </div>
        </Col>

      </Row>
      
      <Row gutter={32}>
        <Col xs={24} sm={24} lg={8}>
        <div className="chart-wrapper">
          
          <ToDoApp preTask={preTask}/>
          
          
        </div>
        </Col>
  
        
      </Row>

      {/*<Row gutter={8}>*/}
      {/*  <Col*/}
      {/*    xs={24}*/}
      {/*    sm={24}*/}
      {/*    md={24}*/}
      {/*    lg={12}*/}
      {/*    xl={12}*/}
      {/*    style={{ paddingRight: "8px", marginBottom: "30px" }}*/}
      {/*  >*/}
      {/*    <TransactionTable />*/}
      {/*  </Col>*/}
      {/*  <Col*/}
      {/*    xs={24}*/}
      {/*    sm={24}*/}
      {/*    md={24}*/}
      {/*    lg={12}*/}
      {/*    xl={12}*/}
      {/*    style={{ marginBottom: "30px" }}*/}
      {/*  >*/}
      {/*    <BoxCard />*/}
      {/*  </Col>*/}
      {/*</Row>*/}
    </div>
  );
};

export default Dashboard;
