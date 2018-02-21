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
      grid: {
        left: '5%',
        right: '4%',
        bottom: '3%',
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
      series: [
        {
          name: '课程支出',
          type: 'bar',
          barWidth: '50%',
          data: this.props.trainee.bar_chart_statistics
        }
      ]
    };

    const option_pie = {
      // title : {
      //   text: '某站点用户访问来源',
      //   subtext: '纯属虚构',
      //   x:'center'
      // },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        // left: 'left',
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
          style={{width: '100%', marginBottom: 50, marginTop: -40}}
        />
        <p style={{fontSize: 'x-large'}}>
          本年各类型课程总支出占比
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
