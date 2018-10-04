import React, { Component } from 'react'

import { remote } from 'electron';
const mainProcess = remote.require('./background.js');
import Header from '../components/Header/Header';
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    /* Bindings */
    this.createNewWindowOfView = this.createNewWindowOfView.bind(this);

    this.menuOptions = [
      {
        action: 'New',
        icon: 'fas fa-plus fa-lg',
        cb: this.createNewWindowOfView,
        arg: "Note"
      },
      {
        action: 'Open',
        icon: 'far fa-folder-open fa-lg',
        cb: () => { }
      }
    ];
  }

  createNewWindowOfView() {
    mainProcess.createWindow("Note");
  }
  render() {
    return (
      <div className="grid home">
        <Header menuOptions={this.menuOptions} view={this.props.view} />
        <input className="search" />
        <div className="thumbnails">Add Thumbnails and Search bar</div>
      </div>
    )
  }
}
