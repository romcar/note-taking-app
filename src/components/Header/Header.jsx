import React from 'react'

import MenuButtons from '../MenuButtons/MenuButtons';



export default (props) => {

  const toggleMenu = () => {
    let menu = document.getElementsByClassName("header--menu")[0];

    let isHidden = menu.classList.contains('hide');

    let node = null;
    let positions = [];

    if (props.view === "Home") {
      node = document.getElementsByClassName('thumbnails')[0];
      positions.push('4/ 1/ -1/ -1', '3/ 1/ -1/ -1');
    } else if (props.view === "Note") {
      node = document.getElementsByClassName('note--text')[0];
      console.log(node)
      positions.push('3/1/-1/-1', '2/1/-1/-1');
    }

    console.log(node);
    if (isHidden) {
      menu.classList.remove('hide');
      menu.classList.add('show');

      node.style.gridArea = positions[0];
    } else {
      menu.classList.remove('show');
      menu.classList.add('hide');

      node.style.gridArea = positions[1];
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
