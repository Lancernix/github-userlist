import React, { Component } from 'react';
import { Row, Col, Input, Divider, message } from 'antd';
import PubSub from 'pubsub-js';

export default class Header extends Component {
  state = {
    searchValue: '',
  };

  notEmpty = () => {
    message.error({
      content: '输入不能为空',
      duration: 1,
      style: {
        marginTop: '10vh',
      },
    });
  };

  onSearch = async () => {
    if (this.state.searchValue.trim() === '') {
      this.notEmpty();
      return;
    }
    PubSub.publish('myMsg', { isFirst: false, isLoading: true });
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${this.state.searchValue}`
      );
      const data = await response.json();
      PubSub.publish('myMsg', { isLoading: false, userList: data.items });
    } catch (error) {
      PubSub.publish('myMsg', { isLoading: false, err: error.message });
    }
  };

  render() {
    return (
      <div>
        <Row justify='center' style={{ margin: '10px auto' }}>
          <Col>
            <Input.Search
              value={this.state.searchValue}
              onChange={(e) => this.setState({ searchValue: e.target.value })}
              placeholder='输入 Github 用户名称'
              enterButton='搜索'
              onSearch={this.onSearch}
            />
          </Col>
        </Row>
        <Divider style={{ margin: '8px 0 0' }} />
      </div>
    );
  }
}
