import React, {Component} from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {Row, Col} from "antd"
import {RunningIcon, SwimmingIcon, RidingIcon} from "../../../../assets/svg";

class ActivityItem extends Component {
  static propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
    styles: PropTypes.object,
  };
  static defaultProps = {
    width: "100%",
    height: "300px",
    styles: {},
    className: "",
  };

  renderActivityType(type){
    if(type === "RUNNING") return <RunningIcon/>
    if(type === "OPEN_WATER_SWIMMING") return <SwimmingIcon/>
    if(type === "ROAD_BIKING") return <RidingIcon/>
    return <RunningIcon/>
  }

  render() {
    const {data} = this.props
    // console.log("data:", data.yy)
    return (
      <Row  className="activity-list-item">
        <Col span={1}>{
          this.renderActivityType(data.activityType)
        }

        </Col>
        <Col span={1}>
          <div className="activity-item-item">
            {data.mm + ' '}
            {  }
            {data.dd}
          </div>
          <div className="activity-item-item">
            {data.yy}
          </div>
        </Col>
        <Col span={7}>
          <div className="activity-item-item">
            {data.activityName}
          </div>
          <div className="activity-item-item">
            {data.activityType}
          </div>
        </Col>
        <Col span={3}>
          <div className="activity-item-item">
            { data.distanceInMeters === undefined ? "---" : data.distanceInMeters } Mi
          </div>
          <div className="activity-item-item">
            Distance
          </div>
        </Col>
        <Col span={3}>
          <div className="activity-item-item">
            { data.durationInSeconds }
          </div>
          <div className="activity-item-item">
            Time
          </div>
        </Col>
        <Col span={3}>
          <div className="activity-item-item">
            { data.averagePaceInMinutesPerKilometer === undefined ? "---" : data.averagePaceInMinutesPerKilometer }
          </div>
          <div className="activity-item-item">
            AVG PACE
          </div>
        </Col>
        <Col span={3}>
          <div className="activity-item-item">
            { data.totalElevationGainInMeters === undefined ? "---" : data.totalElevationGainInMeters }
          </div>
          <div className="activity-item-item">
            TOTAL ASCENT
          </div>
        </Col>
        <Col span={3}>
          <div className="activity-item-item">
            { data.averageHeartRateInBeatsPerMinute } bpm
          </div>
          <div className="activity-item-item">
            AVG HR
          </div>
        </Col>
      </Row>
    )
  }
}

export default connect((state) => state.app)(ActivityItem);
