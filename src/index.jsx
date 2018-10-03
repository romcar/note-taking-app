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

  // maps the views of the application
  static Views() {
    return {
      Home: <Home />,
    }
  }

  //help identify which view we need.
  static View(props) {
    let name = props.location.search.substr(1);
    console.log('Rendering: ', name);
    let view = App.Views()[name];
    if (view === null) {
      throw new Error(`View ${name} is undefined. [index.jsx]`)
    }
    return view;
  }

  render() {
    // switches views
    return (
      <Router>
        <Switch>
          <Route path="/" component={App.View} />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-div')
);
