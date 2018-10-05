import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';

import Home from './containers/Home';
import { remote } from "electron";

import './sass/index.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => {
            return <Home view="Home" />
          }} />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-div')
);
