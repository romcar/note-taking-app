import React from 'react'

export default (props) => {
  return (
    <div className="sidebar grid">
      {/* TODO Create Sidebar */}
      {/* NOTE Start off with notes only */}
      {/* SIDEBAR */}
      {props.options.map((opt, i) => {
        return (<span className="sidebar--option">
          <span className="sidebar--option-icon"><i className={opt.icon}></i></span>
          {opt.action}
        </span>)
      })
      }
    </div>
  )
}
