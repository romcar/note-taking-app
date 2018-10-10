import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';

import Home from './containers/Home';
import Notes from './components/Notes/Note'
import { remote } from "electron";

import './sass/index.scss';

let recentDocuments = [
  {
    id: 'x1238v',
    filePath: 'test path',
    wordCount: 123,
    timeSpent: 123871629,
    contents: 'The little kitty with his pretty witty paws pounced on the pondering panda paul.'
  },
  {
    id: '12k8c273',
    filePath: 'test path',
    wordCount: 123,
    timeSpent: 123871629,
    contents: 'The little kitty with his pretty witty paws pounced on the pondering panda paul.'
  }
];

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => {
            return <Home
              view="Home"
              recentDocuments={recentDocuments}
              {...props} />
          }} />
          <Route exact path="/note" render={(props) => {
            return <Notes
              view="New Note"
              {...props} />
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
