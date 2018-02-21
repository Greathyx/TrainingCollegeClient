import React from 'react';
import ReactEcharts from 'echarts-for-react';
import {connect} from 'dva';


class TraineeConsumptionStaticsPage extends React.Component {

  // React组件初始化时自动调用的方法
  componentWillMount() {
    this.props.dispatch({
      type: 'trainee/getStatisticsForBarChart',
      payload: {
        traineeID: this.props.trainee.trainee_id,
      },
    });
    this.props.dispatch({
      type: 'trainee/getStatisticsForPieChart',
      payload: {
        traineeID: this.props.trainee.trainee_id,
      },
    }).then(value => {
      let pie_chart_legend = [];
      for (let i = 0; i < value.length; i++) {
        pie_chart_legend.push(value[i][0]);
      }
      this.setState({
        pie_chart_legend: pie_chart_legend
      })
    });
  }

  state = {
    pie_chart_legend: []
  };

  render() {
    const option_bar = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        feature: {
          dataView: {
            show: true,
            readOnly: false
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      grid: {
        left: '5%',
        right: '4%',
        bottom: 95,
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      dataZoom: [{
        show: true,
        height: 30,
        xAxisIndex: [0],
        bottom: 30,
        start: 0,
        end: 100,
        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        handleSize: '110%',
        handleStyle: {
          color: "#d3dee5",
        },
        borderColor: "#90979c"
      }, {
        type: "inside",
        show: true,
        height: 15,
        start: 1,
        end: 35
      }],
      series: [
        {
          name: '课程支出',
          type: 'bar',
          itemStyle: {
            color: "rgba(0,191,183,1)",
          },
          barWidth: '50%',
          data: this.props.trainee.bar_chart_statistics
        }
      ]
    };

    const option_pie = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: '10%',
        data: this.state.pie_chart_legend
      },
      series: [
        {
          name: '课程支出',
          type: 'pie',
          radius: '55%',
          center: ['42%', '40%'],
          data: this.props.trainee.pie_chart_statistics,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    return (
      <div style={{padding: '0 50px 0 50px', textAlign: 'center'}}>
        <p style={{fontSize: 'x-large'}}>
          本年每月课程总支出统计
        </p>
        <ReactEcharts
          option={option_bar}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
          style={{width: '100%', height: 500, marginBottom: 50, marginTop: -40}}
        />
        <p style={{fontSize: 'x-large'}}>
          本年各类型课程支出占比
        </p>
        <ReactEcharts
          option={option_pie}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
          style={{width: '100%'}}
        />
      </div>
    )
  }
}

function mapStateToProps({trainee}) {
  return {
    trainee,
  };
}

export default connect(mapStateToProps)(TraineeConsumptionStaticsPage);
