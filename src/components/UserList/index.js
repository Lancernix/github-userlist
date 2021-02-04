import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import PubSub from 'pubsub-js';

export default class UserList extends Component {
  state = {
    isFirst: true,
    isLoading: false,
    err: '',
    userList: [],
  };

  // 组件挂载之后立刻订阅消息
  componentDidMount() {
    this.myPub = PubSub.subscribe('myMsg', (_, data) => {
      this.setState(data);
    });
  }

  // 组件卸载前解除订阅
  componentWillUnmount() {
    PubSub.unsubscribe(this.myPub);
  }

  render() {
    if (this.state.isFirst) {
      return (
        <Row justify='center'>
          <h2 style={{ marginTop: 8 }}>输入名字获得结果</h2>
        </Row>
      );
    } else if (this.state.isLoading) {
      return (
        <Row justify='center'>
          <h2 style={{ marginTop: 8 }}>Loading...</h2>
        </Row>
      );
    } else {
      return (
        <Row gutter={20} justify='center'>
          {this.state.err ? (
            <h2 style={{ marginTop: 8, color: 'red' }}>{this.state.err}</h2>
          ) : (
            this.state.userList.map((item) => (
              <Col xs={12} sm={8} md={6} lg={4} key={item.id}>
                <Card
                  hoverable
                  style={{ borderRadius: 8, marginTop: 12, overflow: 'hidden' }}
                  cover={<img alt='用户头像' src={item.avatar_url} />}
                >
                  <a href={item.html_url} target='_blank' rel='noreferrer'>
                    <Card.Meta title={item.login} />
                  </a>
                </Card>
              </Col>
            ))
          )}
        </Row>
      );
    }
  }
}
