import React from 'react'

import MenuButtons from '../MenuButtons/MenuButtons';



export default (props) => {

  const toggleMenu = () => {
    let menu = document.getElementsByClassName("header--menu")[0];

    let isHidden = menu.classList.contains('hide');

    if (isHidden) {
      menu.classList.remove('hide');
      menu.classList.add('show');
      const thumbnails = document.getElementsByClassName('thumbnails')[0];

      thumbnails.style.gridArea = '3/ 1/ -1/ -1';
    } else {
      menu.classList.remove('show');
      menu.classList.add('hide');

      const thumbnails = document.getElementsByClassName('thumbnails')[0];
      thumbnails.style.gridArea = '2/ 1/ -1/ -1';
    }
  }
  return (
    <div className="header">
      <div onClick={() => toggleMenu()} className="menu--button">
        <i className="fas fa-caret-down fa-2x" />
        <h3 className="header--title">
          Title
      </h3>
      </div>
      <span className="header--menu hide" >
        <MenuButtons menuOptions={props.menuOptions} />
      </span>
    </div >
  )
}
