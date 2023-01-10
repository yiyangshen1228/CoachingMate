import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import echarts from "@/lib/echarts";
import { debounce } from "@/utils";
import {generatePreviousWeekDate} from "../../../../utils/date";

class BarChart extends Component {
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
    previousWeek: generatePreviousWeekDate(),

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
    const animationDuration = 3000;
    console.log("HeartRateZones:", data)
    this.state.chart.setOption({
      // title: {
      //   text: 'Waterfall Chart',
      // },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
          let str = ""
          for(let i = params.length - 1; i >= 0; i--){
            let param = params[i]
            let circle = "<div style='float:left;width: 10px; height: 10px;margin-top: 5px; background:" + param.color
              + ";border-radius: 5px'></div>"
            let text = "<div style='height: 10px;margin-left: 20px'>" + param.seriesName+ "  "
              + "<span style='color:" + param.color + "'>"+ param.value + "</span>" + " mins" + "</div>"
            str += "<div style='width: 250px'>" + circle + text + "</div>"
            str += "<br>"
          }

          return str
        }
      },
      grid: {
        top: 10,
        left: "2%",
        right: "2%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: this.state.previousWeek,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "Warm Up 89 - 106 bpm",
          type: "bar",
          stack: "vistors",
          barWidth: "60%",
          data:  data.data[0],
          animationDuration,
        },
        {
          name: "Easy 107 - 124 bpm",
          type: "bar",
          stack: "vistors",
          barWidth: "60%",
          data:  data.data[1],
          animationDuration,
        },
        {
          name: "Aerobic 125 - 141 bpm",
          type: "bar",
          stack: "vistors",
          barWidth: "60%",
          data:  data.data[2],
          animationDuration,
        },
        {
          name: "Threshold 142 - 159 bpm",
          type: "bar",
          stack: "vistors",
          barWidth: "60%",
          data: data.data[3],
          animationDuration,
        },
        {
          name: "Maximum 160 bpm",
          type: "bar",
          stack: "vistors",
          barWidth: "60%",
          data: data.data[4],
          animationDuration,
        },
      ],
    });
  }

  initChart() {
    if (!this.el) return;
    let {data} = this.props
    let chartData = []
    for(let i = 0; i < 5; i++){
      chartData.push([
        (data[6][i]).toFixed(1),
        (data[5][i]).toFixed(1),
        (data[4][i]).toFixed(1),
        (data[3][i]).toFixed(1),
        (data[2][i]).toFixed(1),
        (data[1][i]).toFixed(1),
        (data[0][i]).toFixed(1)])
    }
    this.setState({ chart: echarts.init(this.el, "macarons") }, () => {
      this.setOptions({data: chartData});
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

export default connect((state) => state.app)(BarChart);
