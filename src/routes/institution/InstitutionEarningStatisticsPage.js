import React from 'react';
import ReactEcharts from 'echarts-for-react';
import {connect} from 'dva';


class InstitutionEarningStatisticsPage extends React.Component {

  // React组件初始化时自动调用的方法
  componentWillMount() {
    // 如果未登录，则跳转到登陆界面
    if (!this.props.institution.hasLoggedIn) {
      this.props.history.push("/InstitutionLogin");
    }
    this.props.dispatch({
      type: 'institution/getStatisticsForBarAndLineChart',
      payload: {
        institutionID: this.props.institution.institution_id,
      },
    });
    this.props.dispatch({
      type: 'institution/getStatisticsForPieChart',
      payload: {
        institutionID: this.props.institution.institution_id,
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
      tooltip: {
        trigger: 'axis',
        axisPointer: {          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: "{b}<br/>{a0}: {c0}人<br>{a1}: ¥{c1}"
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
        borderWidth: 0,
        bottom: 95,
        containLabel: true
      },
      legend: {
        data: ['订课人数', '课程收入']
      },
      xAxis: [{
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      }],
      yAxis: [{
        type: 'value',
        name: '订课人数',
        minInterval: 1,
        position: 'right',
      }, {
        type: 'value',
        name: '课程收入',
        position: 'left'
      }],
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
      series: [{
        name: '订课人数',
        type: 'line',
        // stack: '总量',
        symbolSize: 10,
        symbol: 'circle',
        label: {
          normal: {
            show: true,
            position: 'top',
          }
        },
        // itemStyle: {
        //   color: "rgba(252,230,48,1)",
        // },
        lineStyle: {
          normal: {
            width: 3,
            shadowColor: 'rgba(252,230,48,1',
          }
        },
        data: this.props.institution.line_chart_statistics
      }, {
        name: '课程收入',
        type: 'bar',
        yAxisIndex: 1,
        // stack: '总量',
        itemStyle: {
          color: "rgba(0,191,183,1)",
        },
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        data: this.props.institution.bar_chart_statistics
      }]
    };

    const option_pie = {
      tooltip: {
        trigger: 'item',
        formatter: "{a}<br/>{b}: ¥{c} ({d}%)"
      },
      toolbox: {
        feature: {
          dataView: {
            show: true,
            readOnly: false
          },
          saveAsImage: {
            show: true
          }
        }
      },
      legend: {
        orient: 'vertical',
        left: '10%',
        data: this.state.pie_chart_legend
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['42%', '40%'],
          data: this.props.institution.pie_chart_statistics,
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
          本年每月课程收入及订课人数统计
        </p>
        <ReactEcharts
          option={option_bar}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
          style={{width: '100%', marginBottom: 50, height: 500}}
        />
        <p style={{fontSize: 'x-large'}}>
          本年各类型课程收入占比
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

function mapStateToProps({institution}) {
  return {
    institution,
  };
}

export default connect(mapStateToProps)(InstitutionEarningStatisticsPage);
