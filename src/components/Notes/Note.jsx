import React from 'react'
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar'

let menuOptions = [
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

export default (props) => {
  return (
    <div className="note grid">
      <Header {...props} />
      <div className="container grid note--content">
        <Sidebar options={menuOptions} />
        {/* TODO Fix tab not putting multiple spaces. SUPER ANNOYING*/}
        <textarea className="note--text" />
      </div>
    </div>
  )
}
