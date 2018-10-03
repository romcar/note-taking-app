import React from 'react'
import PropTypes from 'prop-types';
const MenuButtons = (props) => {
  return (
    <div className="menu">
      {props.menuOptions.map((opt, i) => {
        return (<div key={i} className={`option ${opt.action.toLowerCase().replace(/\s/igm, '-')}`} >
          <i className={`${opt.icon}`} ></i>
          <p className="option--text">{opt.action}</p>
        </div>)
      })}
    </div >
  )
}

MenuButtons.propTypes = {
  menuOptions: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.string,
    icon: PropTypes.string
  }))
}

export default MenuButtons;
