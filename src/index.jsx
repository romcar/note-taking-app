import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';

import Home from './containers/Home';
import Notes from './components/Notes/Note';

import './sass/index.scss';

class App extends Component {
  constructor(props) {
    super(props);

    /* Bindings */
    this.addToRecentNotes = this.addToRecentNotes.bind(this);

    this.state = {
      recentNotes: {}
    }
    /* TODO Refactor to an object for O(1) look up */

  }

  componentDidMount() {
    if (Object.keys(this.state.recentNotes).length <= 1) {
      let { recentNotes } = this.state;
      let notes = JSON.parse(localStorage.getItem('recentNotes')) || [];

      recentNotes = Object.keys(notes).length ? notes : {};
      console.log('recent notes :', recentNotes);
      this.setState({ recentNotes });
    }
  }

  addToRecentNotes(note, cb) {
    let { recentNotes } = Object.assign({}, this.state);
    console.log(note)
    console.log('note ^^^^^')
    recentNotes[note.note.id] = Object.assign({}, note);
    if (cb) {
      cb();
    }

    localStorage.setItem('recentNotes', JSON.stringify(recentNotes));
    this.setState({ recentNotes });
  }
  render() {
    console.log(this.state)
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => {
            return <Home
              view="Home"
              addToRecent={this.addToRecentNotes}
              recentNotes={this.state.recentNotes}
              {...props} />
          }} />
          <Route exact path="/note/new" render={(props) => {
            return <Notes
              view="New Note"
              addToRecent={this.addToRecentNotes}
              {...props} />
          }} />
          <Route exact path="/note/:noteId" render={(props) => {
            return <Notes
              view="Note"
              addToRecent={this.addToRecentNotes}
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
