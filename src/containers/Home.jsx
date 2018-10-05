import React, { Component } from 'react'

/* Components */
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

import { remote } from 'electron';
const mainProcess = remote.require('./background.js');
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    /* Bindings */

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
        <Header />
        <div className="container">
          <Sidebar options={this.menuOptions} />
          <div className="thumbnails">
            {/* TODO Implement some sort of thumbnail system with tags */}
            Thumbnails here!
            {/* NOTE map recently opened/used notes */}
          </div>
        </div>
      </div>
    )
  }
}
