import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Home from './containers/Home';
import { remote } from "electron";

import './sass/index.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<Home />)
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-div')
);
