import React from 'react'

export default (props) => {
  return (
    <div className="sidebar grid hide">
      {/* TODO Create Sidebar */}
      {/* NOTE Start off with notes only */}
      {/* SIDEBAR */}
      <div className="options">
        {props.options.map((opt, i) => {
          return (<span onClick={!!opt.arg ? () => opt.cb(opt.arg) : opt.cb} key={i + opt.action} className="sidebar--option">
            <span className="sidebar--option-icon"><i className={opt.icon}></i></span>
            {opt.action}
          </span>)
        })}
      </div>
    </div>
  )
}
