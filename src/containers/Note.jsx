import React, { Component } from 'react'

import Header from '../components/Header/Header';
export default class componentName extends Component {

  constructor(props) {
    super(props);

    this.menuOptions = [
      {
        action: 'Bookmark',
        icon: 'far fa-bookmark fa-lg',
        cb: () => console.log(('bookmark'))
      },
      {
        action: 'Open',
        icon: 'far fa-folder-open fa-lg',
        cb: () => { }
      },
      {
        action: 'Save',
        icon: 'far fa-save',
        cb: () => console.log('save note')
      },


    ];
  }
  render() {
    return (
      <div className="grid note">
        <Header menuOptions={this.menuOptions} view={this.props.view} />
        <textarea className="note--text"></textarea>
      </div>
    )
  }
}
