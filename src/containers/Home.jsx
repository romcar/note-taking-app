import React, { Component } from 'react'

import Header from '../components/Header/Header';


let menuOptions = [
  {
    action: 'New Note',
    icon: 'fas fa-plus fa-lg'
  },
  {
    action: 'Open File',
    icon: 'far fa-folder-open fa-lg'
  }
];
export default class Home extends Component {
  render() {
    return (
      <div className="grid home">
        <Header menuOptions={menuOptions} />
        <div className="thumbnails">thumbnails</div>
      </div>
    )
  }
}
