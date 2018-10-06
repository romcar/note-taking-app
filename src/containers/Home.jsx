import React, { Component } from 'react'

/* Components */
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Thumbnails from '../components/Thumbnails/Thumbnails';
import { remote } from 'electron';
const mainProcess = remote.require('./background.js');
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recentNotes: []
    };
    /* Bindings */
    // this.createNewNote = this.createNewNote.bind(this);


    this.menuOptions = [
      {
        action: 'New',
        icon: 'fas fa-plus fa-lg',
        cb: () => { }
      },
      {
        action: 'Open',
        icon: 'far fa-folder-open fa-lg',
        cb: () => { }
      }
    ];
  }
  render() {
    return (
      <div className="grid home">
        <Header {...this.props} />
        <div className="container">
          <Sidebar options={this.menuOptions} />
          <Thumbnails recentNotes={this.state.recentNotes} />
        </div>
      </div>
    )
  }
}
