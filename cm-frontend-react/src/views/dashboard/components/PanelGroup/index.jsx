import React from "react";
import { Row, Col, Icon } from "antd";
import CountUp from "react-countup";
import {UserOutlined, ShoppingCartOutlined, MessageOutlined,  DollarCircleOutlined} from '@ant-design/icons';
import "./index.less";
import {RidingIconYellow, RunningIconRed, SwimmingIconBlue} from "../../../../assets/svg";

const chartList = [
  {
    type: "AllTime",
    name: "All Activities",
    icon: <UserOutlined style={{ fontSize: 55, color: "#40c9c6"}} />,
    num: 102400,
    color: "#40c9c6",
    
  },
  {
    type: "RunningTime",
    name: "Running",
    icon: <RunningIconRed style={{ fontSize: 55, color: "#36a3f7"}} />,
    num: 81212,
    color: "#36a3f7",
    
  },
  {
    type: "SwimmingTime",
    name: "Swimming",
    icon: <SwimmingIconBlue style={{ fontSize: 55, color: "#f4516c"}} />,
    num: 9280,
    color: "#f4516c",
    
  },
  {
    type: "RiddingTime",
    name: "Riding",
    icon: <RidingIconYellow style={{ fontSize: 55, color: "#f6ab40"}} />,
    num: 13600,
    color: "#f6ab40",
    
  },
];

const PanelGroup = (props) => {
  const {data, handleSetLineChartData, handleSetProgressChartData } = props;
  chartList[0].num = data.ttlActivityTimes
  chartList[1].num = data.ttlRunningTimes
  chartList[2].num = data.ttlSwimmingTimes
  chartList[3].num = data.ttlRiddingTimes
  return (
    <div className="panel-group-container">
      <Row gutter={40} className="panel-group">
        {chartList.map((chart, i) => (
          <Col
            key={i}
            lg={6}
            sm={12}
            xs={12}
            // onClick={handleSetLineChartData.bind(this, chart.type)}
            onClick={function(){
              props.handleSetProgressChartData(chart.type);
              // handleSetLineChartData.bind(this, chart.type)
              handleSetLineChartData(chart.type)

              
            }}
            
            className="card-panel-col"
          >
            <div className="card-panel">
              <div className="card-panel-icon-wrapper">
                {chart.icon}
              </div>
              <div className="card-panel-description">
                <p className="card-panel-text">{chart.name}</p>
                <CountUp end={chart.num} start={0} className="card-panel-num" />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PanelGroup;
