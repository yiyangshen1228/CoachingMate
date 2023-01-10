import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import echarts from "@/lib/echarts";
import { debounce } from "@/utils";

class RaddarChart extends Component {
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
  state = {
    chart: null,
  };

  componentDidMount() {
    debounce(this.initChart.bind(this), 300)();
    window.addEventListener("resize", () => this.resize());
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.sidebarCollapsed !== this.props.sidebarCollapsed) {
      this.resize();
    }
    if (nextProps.chartData !== this.props.chartData) {
      debounce(this.initChart.bind(this), 300)();
    }
  }

  componentWillUnmount() {
    this.dispose();
  }

  resize() {
    const chart = this.state.chart;
    if (chart) {
      debounce(chart.resize.bind(this), 300)();
    }
  }

  dispose() {
    if (!this.state.chart) {
      return;
    }
    window.removeEventListener("resize", () => this.resize()); // 移除窗口，变化时重置图表
    this.setState({ chart: null });
  }

  setOptions(data) {
    console.log("Radar:", data)
    const animationDuration = 3000;
    this.state.chart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      radar: {
        radius: "66%",
        center: ["50%", "42%"],
        splitNumber: 8,
        splitArea: {
          areaStyle: {
            color: "rgba(127,95,132,.3)",
            opacity: 1,
            shadowBlur: 45,
            shadowColor: "rgba(0,0,0,.5)",
            shadowOffsetX: 0,
            shadowOffsetY: 15,
          },
        },
        indicator: [
          { name: "Time", max: data.limitation[0] },
          { name: "Calories", max: data.limitation[1] },
          { name: "Distance", max: data.limitation[2] },
          { name: "Avg Speed", max: data.limitation[3] },
          { name: "Peak Speed ", max: data.limitation[4] },
          { name: "Avg Heart Rate", max: data.limitation[5] },
        ],
      },
      legend: {
        left: "center",
        bottom: "10",
        data: ["Running", "Swimming", "Riding"],
      },
      series: [
        {
          type: "radar",
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: "rgba(0,0,0,.2)",
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1,
            },
          },
          data: [
            {
              value: data.runningList,
              name: "Running",
            },
            {
              value: data.swimmingList,
              name: "Swimming",
            },
            {
              value: data.riddingList,
              name: "Riding",
            },
          ],
          animationDuration,
        },
      ],
    });
  }

  initChart() {
    if (!this.el) return;
    let {data} = this.props
    let running = data["RUNNING"]
    let swimming = data["OPEN_WATER_SWIMMING"]
    let ridding = data["ROAD_BIKING"]
    let runningList = [running["time"], running["calories"],
      running["distance"], running["avgSpeed"], running["peakSpeed"], running["avgHeartRate"]]
    let swimmingList = [swimming["time"], swimming["calories"],
      swimming["distance"], swimming["avgSpeed"], swimming["peakSpeed"], swimming["avgHeartRate"]]
    let riddingList = [ridding["time"], ridding["calories"],
      ridding["distance"], ridding["avgSpeed"], ridding["peakSpeed"], ridding["avgHeartRate"]]
    let limitation = []
    for(let i = 0; i < running.length; i++){
      limitation.add(Math.max(swimmingList[i], runningList[i], riddingList[i]))
    }

    this.setState({ chart: echarts.init(this.el, "macarons") }, () => {
      this.setOptions({limitation: limitation, runningList: runningList, swimmingList:swimmingList, riddingList:riddingList});
    });
  }

  render() {
    const { className, height, width, styles } = this.props;
    return (
      <div
        className={className}
        ref={(el) => (this.el = el)}
        style={{
          ...styles,
          height,
          width,
        }}
      />
    );
  }
}

export default connect((state) => state.app)(RaddarChart);
