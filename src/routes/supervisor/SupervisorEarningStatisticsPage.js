import React from 'react';
import ReactEcharts from 'echarts-for-react';
import {connect} from 'dva';


class SupervisorEarningStatisticsPage extends React.Component {

  // React组件初始化时自动调用的方法
  componentWillMount() {
    this.props.dispatch({
      type: 'supervisor/getStatisticsForBarChart',
      payload: {},
    });
    this.props.dispatch({
      type: 'supervisor/getStatisticsForPieChart',
      payload: {},
    });
  }

  state = {};

  render() {
    const option_bar = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: "{b}<br/>{a}: ¥{c}"
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
      dataZoom: [
        {
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 40,
          start: 0,
          end: 100
        },
        {
          type: "inside",
          show: true,
          height: 15,
          xAxisIndex: [
            0
          ],
          start: 1,
          end: 35
        }
      ],
      series: [
        {
          name: '收入',
          type: 'bar',
          itemStyle: {
            color: "rgba(0,191,183,1)",
          },
          barWidth: '50%',
          data: this.props.supervisor.bar_chart_statistics
        }
      ]
    };

    const option_pie = {
      tooltip: {
        trigger: 'item',
        formatter: "{a}<br/>{b}: ¥{c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: '10%',
        data: ['订课分成', '退课差额']
      },
      series: [
        {
          name: '收入来源',
          type: 'pie',
          radius: '55%',
          center: ['42%', '40%'],
          data: this.props.supervisor.pie_chart_statistics,
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
          本年每月收入统计
        </p>
        <ReactEcharts
          option={option_bar}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
          style={{width: '100%', height: 500, marginBottom: 50}}
        />
        <p style={{fontSize: 'x-large'}}>
          本年收入来源占比
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

function mapStateToProps({supervisor}) {
  return {
    supervisor,
  };
}

export default connect(mapStateToProps)(SupervisorEarningStatisticsPage);
