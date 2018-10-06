import React, { Component } from 'react'
import { ipcRenderer } from 'electron';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar'

import { openFile, readFile } from '../../utils/tools';
let menuOptions = [
  {
    action: 'New',
    icon: 'fas fa-plus fa-lg',
    cb: () => { },
    arg: ['']
  },
  {
    action: 'Open',
    icon: 'far fa-folder-open fa-lg',
    cb: openFile,
    arg: ['']
  }
];

export default class Note extends Component {
  constructor(props) {
    super(props);

    /* Bindings */
    this.handleFileLoad = this.handleFileLoad.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    ipcRenderer.on('open-file-reply', readFile);
    ipcRenderer.on('load-file-reply', this.handleFileLoad)
  }
  componentWillUnmount() {
    ipcRenderer.removeListener('open-file-reply');
    ipcRenderer.removeListener('load-file-reply');
  }

  handleFileLoad(event, content) {
    console.log(content);
    let noteTextNode = document.getElementsByClassName('note--text')[0];
    noteTextNode.value = content;
  }

  handleTextChange() {
    let { value } = event.target;
    this.setState({ text: value })
  }
  render() {
    return (
      <div className="note grid" >
        <Header {...this.props} />
        <div className="container grid note--content">
          <Sidebar options={menuOptions} />
          {/* TODO Fix tab not putting multiple spaces. SUPER ANNOYING*/}
          <textarea onChange={this.handleTextChange} className="note--text" value={this.state.text} />
        </div>
      </div>
    );
  }
}
