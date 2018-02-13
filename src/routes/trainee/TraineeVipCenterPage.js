import React from 'react';
import {connect} from 'dva';
import {Card, Icon, Modal} from 'antd';
import styles from '../css/TraineeVipCenterPage.css';


const {Meta} = Card;

function level_info() {
  Modal.info({
    title: '会员等级规则',
    content: (
      <div>
        <p>
          累计消费满100元 --1级<br/>
          累计消费满200元 --2级<br/>
          累计消费满500元 --3级<br/>
          累计消费满1000元 --4级<br/>
          累计消费满2000元 --5级<br/>
          累计消费满5000元 --6级<br/>
          累计消费满10000元 --7级<br/>
          累计消费满20000元 --8级<br/>
          累计消费满50000元 --9级<br/>
          累计消费满100000元 --10级
        </p>
      </div>
    ),
    onOk() {},
    okText: "我知道了",
  });
}

function discount_info() {
  Modal.info({
    title: '优惠折扣规则',
    content: (
      <div>
        <p>
          累计消费满100元 --0.99折<br/>
          累计消费满200元 --0.98折<br/>
          累计消费满500元 --0.95折<br/>
          累计消费满1000元 --0.90折<br/>
          累计消费满2000元 --0.88折<br/>
          累计消费满5000元 --0.85折<br/>
          累计消费满10000元 --0.80折<br/>
          累计消费满20000元 --0.77折<br/>
          累计消费满50000元 --0.75折<br/>
          累计消费满100000元 --0.70折
        </p>
      </div>
    ),
    onOk() {},
    okText: "我知道了",
  });
}

function credit_info() {
  Modal.info({
    title: '会员积分规则',
    content: (
      <div>
        <p>
          单笔消费每满100元，可获得10点积分。<br/>
          1点积分可在购买课程时可抵扣1元金额。
        </p>
      </div>
    ),
    onOk() {},
    okText: "我知道了",
  });
}

class TraineeVipCenterPage extends React.Component {

  // React组件初始化时自动调用的方法
  componentWillMount() {
    this.props.dispatch({
      type: 'trainee/getTraineeVipInfo',
      payload: {
        trainee_id: this.props.trainee.trainee_id
      },
    });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.inner_wrapper}>
          <p className={styles.welcome}>
            会员中心
          </p>
          <Card
            title="我的会员信息"
            className={styles.card}
            // cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
            actions={[
              <span onClick={level_info}>
                <Icon type="question-circle-o" style={{marginRight: 2}}/>
                查看会员等级规则
              </span>,
              <span onClick={discount_info}>
                <Icon type="question-circle-o" style={{marginRight: 2}}/>
                查看折扣优惠规则
              </span>,
              <span onClick={credit_info}>
                <Icon type="question-circle-o" style={{marginRight: 2}}/>
                查看会员积分规则
              </span>
            ]}
          >
            <Meta
              title="累计消费(¥)"
              description={this.props.trainee.expenditure + "元"}
            /><br/>
            <Meta
              title="会员等级"
              description={this.props.trainee.level + "级"}
            /><br/>
            <Meta
              title="可享折扣优惠"
              description={this.props.trainee.discount + "折"}
            /><br/>
            <Meta
              title="会员积分"
              description={this.props.trainee.credit + "分"}
            />
          </Card>
        </div>
      </div>
    )
  }
}

function mapStateToProps({trainee}) {
  return {
    trainee,
  };
}

export default connect(mapStateToProps)(TraineeVipCenterPage);
