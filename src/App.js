import React, { Component } from 'react';
import Header from './components/Header';
import UserList from './components/UserList';
import 'antd/dist/antd.css';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <UserList />
      </div>
    );
  }
}
