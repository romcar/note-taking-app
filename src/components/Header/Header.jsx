import React from 'react'

export default ({ match }) => {
  const toggleMenu = () => {
    let sidebar = document.getElementsByClassName("sidebar")[0];
    let isHidden = sidebar.classList.contains("hide");
    let view = match.path.substr(1);
    let content = null;

    if (view === 'note') {
      content = document.getElementsByClassName('note--text')[0];
    } else {
      content = document.getElementsByClassName('thumbnails')[0];
      console.log(content);
    }

    if (isHidden) {
      sidebar.classList.remove('hide');
      content.style.width = '80.65vw';
    } else {
      sidebar.classList.add('hide');
      content.style.width = "99.74vw";
    }
  };

  return (
    <div className="header">
      {/* ANCHOR Menu Button Icon */}
      <span onClick={() => toggleMenu()} className="menu-button"><i className="fas fa-ellipsis-h fa-2x"></i></span>
      {/* NOTE Make Dynamic as possible. Take in an array of menu options.*/}
    </div>
  )
}
