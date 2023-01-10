import React, {useState, Component} from "react";
import {Avatar, Row, Col, Input, Space, Segmented, Modal} from 'antd';
import Icon, {HomeOutlined} from '@ant-design/icons';
import {RunningIcon, RidingIcon, SwimmingIcon} from "../../assets/svg";
import {Tabs} from 'antd';
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import DocumentTitle from "react-document-title";
import './index.less'
import {login, getUserInfo} from "@/store/actions";
import { LoadingOutlined } from '@ant-design/icons';
import ActivityItem from "./components/ActivityItem";
import {getAccessToken} from "../../utils/auth";
import {getActivityByAccessToken, getActivityDetailsByActivityId} from "@/api/activity";
import HeatMap from "./components/HeatMap";
import {getLocalTime, secondToDate} from "@/utils/date";
import {getActivityByAccessTokenAndType} from "../../api/activity";


const {TabPane} = Tabs;

const {Search} = Input;
const onSearch = value => console.log(value);

const Activities = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     activityList: []
  //   };
  // }
  const [activityList, setActivityList] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [detailLoading, setDetailLoading] = React.useState(false);
  const [activityDetails, setActivityDetails] = React.useState(false);
  const [activitySummary, setActivitySummary] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [totalAscent, setTotalAscent] = useState(false);
  const [totalDescent, setTotalDescent] = useState(false);
  const [minEle, setminEle] = useState(false);
  const [maxEle, setMaxEle] = useState(false);
  const [avgTemp, setAvgTemp] = useState(false);
  const [minTemp, setMinTemp] = useState(false);
  const [maxTemp, setMaxTemp] = useState(false);

  const showActivityDetail = (v) => {
    // console.log(v)
    setActivitySummary(v)
    getActivityDetailsByActivityId({activityId: v.activityId}).then(response => {
      let data = response.data
      setActivityDetails(data)

      let eleLst = []
      let tempLst = []
      for (let i = 0; i < data.samples.length; i++) {
        let tmp = data.samples[i]
        eleLst.push(tmp.elevationInMeters)
        tempLst.push(tmp.airTemperatureCelcius)
      }
      console.log("Hello")

      setminEle(Math.min(...eleLst).toFixed(1))
      setMaxEle(Math.max(...eleLst).toFixed(1))
      setTotalAscent((maxEle - minEle).toFixed(1))
      setTotalDescent(-totalAscent)
      setMinTemp(Math.min(...tempLst).toFixed(1))
      setMaxTemp(Math.max(...tempLst).toFixed(1))
      console.log("minEle:", minEle)
      // this.maxEve =
      // this.totalAscent =
      // this.totalDescent = -this.totalAscent
      // this.minTemp =
      // this.maxTemp =
      let sum = 0
      for (let i = 0; i < tempLst.length; i++) {
        sum += tempLst[i]
      }
      setAvgTemp((sum / tempLst.length).toFixed(1))
      this.activityDetailsVisible = true
    }).catch(error => {

    })
    setIsModalVisible(true);
  };


  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // let activityList = []
  React.useEffect(() => {
    setLoading(true)
    getActivityByAccessToken({accessToken: getAccessToken()}).then(response => {

        let data = response.data
        // for

        // console.log(response.data)
        // this.paging.totalPage = data.length
        for (let i = 0; i < data.length; i++) {
          let tmp = data[i]

          data[i].date = getLocalTime(tmp.startTimeInSeconds).split(",")[0]
          data[i].durationInSeconds = secondToDate(tmp.durationInSeconds)
          let date = data[i].date.split(" ")
          // console.log(data[i].date)
          data[i].dd = date[0]
          data[i].mm = date[1]
          data[i].yy = date[2]

        }
        setActivityList(data);
        setLoading(false)
      }
    ).catch()
  }, []);
  const callback = (key) => {
    console.log(key);
  }

  const changeActivityType = (activityType) => {
    setLoading(true)
    getActivityByAccessTokenAndType({
      accessToken: getAccessToken(),
      activityType: activityType
    }).then((response)=> {
        let data = response.data
        // for

        // console.log(response.data)
        // this.paging.totalPage = data.length
        for (let i = 0; i < data.length; i++) {
          let tmp = data[i]

          data[i].date = getLocalTime(tmp.startTimeInSeconds).split(",")[0]
          data[i].durationInSeconds = secondToDate(tmp.durationInSeconds)
          let date = data[i].date.split(" ")
          // console.log(data[i].date)
          data[i].dd = date[0]
          data[i].mm = date[1]
          data[i].yy = date[2]

        }
        setActivityList(data);
      setLoading(false)
      }
    ).catch(error => {

      }
    )
  }
  const divStyle = {
    color: 'blue'
  };

  // const getActivityList = () => {
  //   getActivityByAccessToken({accessToken: getAccessToken()}).then(response => {
  //     return response.data
  //     }
  //   ).catch()
  // }
  // activityList = getActivityList()
  // console.log(activityList)
  if (!activityList) return null;
  return (

    <div className="activities-container">
      <Row className="activities-bar">
        <Col span={6}>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </Col>
        <Col span={14} offset={4}>
          <Segmented size="small" block onChange={changeActivityType} options={['All',
            {
              value: 'RUNNING',
              icon: <RunningIcon/>,
            }, {
              value: 'OPEN_WATER_SWIMMING',
              icon: <SwimmingIcon color={"#fff"}/>,
            }, {
              value: 'ROAD_BIKING',
              icon: <RidingIcon color={"#1776d0"}/>,
            }]}/>

        </Col>
      </Row>
      <Modal title="Activity Detail" visible={isModalVisible} onOk={handleOk}
             onCancel={handleCancel} className="activity_detail_modal" width={1000}>
        <HeatMap/>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Stat" key="1">
            <Row>
              <Col span={5}>
                <span className="detail-item-name">Distance</span>
                <span className="detail-item">
                {activitySummary.distanceInMeters === undefined ? "0" : activitySummary.distanceInMeters}
                </span>
                <span className="detail-name">Distance</span>
                <span className="detail-item-name">Calories</span>
                <span className="detail-item">
                {
                  activitySummary.activeKilocalories === undefined ? "0" : activitySummary.activeKilocalories
                }
                </span>
                <span className="detail-name">Calories</span>
              </Col>
              <Col span={5} className="detail-col">
                <span className="detail-item-name">Heart Rate</span>
                <span className="detail-item">
              {
                activitySummary.averageHeartRateInBeatsPerMinute === undefined ? "0" : activitySummary.averageHeartRateInBeatsPerMinute
              } bpm
                </span>

                <span className="detail-name">Avg HR </span>
                <span className="detail-item">
              {
                activitySummary.maxHeartRateInBeatsPerMinute === undefined ? "0" : activitySummary.maxHeartRateInBeatsPerMinute
              } bpm
                </span>

                <span className="detail-name">Max HR </span>
                <span className="detail-item-name">Timing</span>
                {
                  activitySummary.durationInSeconds === undefined ? "0" : activitySummary.durationInSeconds
                }
                <span className="detail-name">Second</span>
              </Col>
              <Col span={5} className="detail-col">
                <span className="detail-item-name">Elevation</span>
                <span className="detail-item">
                {totalAscent === "" ? "0" : totalAscent} Mi
              </span>
                <span className="detail-name">Total Ascent</span>
                <span className="detail-item">
                {totalDescent === undefined ? "0" : totalDescent} Mi
              </span>
                <span className="detail-name">Total Descent</span>
                <span className="detail-item">
                {minEle} Mi
              </span>
                <span className="detail-name">Min Elev</span>
                <span className="detail-item">
                {maxEle} Mi
              </span>
                <span className="detail-name">Min Elev</span>
              </Col>
              <Col span={5} className="detail-col">
                <span className="detail-item-name">Temperature</span>
                <span className="detail-item">
                {avgTemp} °C
              </span>
                <span className="detail-name">Avg Temp</span>
                <span className="detail-item">
                {minTemp} °C
              </span>
                <span className="detail-name">Min Temp</span>
                <span className="detail-item">
                {maxTemp} °C
              </span>
                <span className="detail-name">Max Temp</span>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Heart Rate Zone" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Laps" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Modal>
      <div>
        {loading ? <LoadingOutlined className="loading-style" spin />:
          activityList.map((v, i) => {
            return <div key={i} onClick={() => showActivityDetail(v)}>
              <ActivityItem data={v}/>
            </div>


          })
        }
      </div>
    </div>
  )


}
export default Activities
// export default connect((state) => state.app)(Activities);
