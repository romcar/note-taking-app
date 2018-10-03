import React, { Component } from 'react'

import Header from '../components/Header/Header';


let menuOptions = [];
export default class Home extends Component {
  render() {
    return (
      <div className="grid home">
        <Header />
        <div>thumbnails</div>
      </div>
    )
  }
}
