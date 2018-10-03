import React, { Component } from 'react'

const menuOptions = [
  {
    action: 'Bookmark',
    icon: 'far fa-bookmark fa-lg'
  },
  {
    action: 'Save',
    icon: 'far fa-save'
  },

];
export default class componentName extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        Notes
      </div>
    )
  }
}
