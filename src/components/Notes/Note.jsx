import React, { Component } from 'react'
import { ipcRenderer } from 'electron';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar'

import {
  openFile,
  readFile,
  saveFile
} from '../../utils/tools';

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

    /* TODO create time spent funtionality */
    /* TODO Create functionality that makes the tags IMPORTANT */

    /* Bindings */
    this.handleFileLoad = this.handleFileLoad.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleFileSave = this.handleFileSave.bind(this);
    this.handleFileSaved = this.handleFileSaved.bind(this);
    this.handleReadFile = this.handleReadFile.bind(this);
    this.delay = 5000;
    this.saveFileTimer = null;
    this.timerEvent = new CustomEvent('time-spent-timer', { detail: new Date() });

    this.state = {
      note: {
        content: '',
        id: 'create',
        filePath: '/notes',
        timeSpent: 0,
        wordCount: 0,
      },
      meta: {
        count: 0,
        fileName: `note`,
        extension: '.txt'
      }
    }
  }

  componentDidMount() {
    ipcRenderer.on('open-file-reply', this.handleReadFile);
    ipcRenderer.on('load-file-reply', this.handleFileLoad);
    ipcRenderer.on('save-file-reply', this.handleFileSaved);
    if (!localStorage.getItem('note-count')) {
      localStorage.setItem('note-count', this.state.meta.count);
    } else {
      let tempState = Object.assign({}, this.state);
      tempState.meta.count = localStorage.getItem('note-count');
      this.setState(tempState);
    }

    document.addEventListener('keydown', () => {
      clearTimeout(this.saveFileTimer);
      this.saveFileTimer = setTimeout(() => {
        this.handleFileSave();
      }, this.delay);
    })
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('open-file-reply');
    ipcRenderer.removeListener('load-file-reply');
  }

  handleReadFile(event, filePath) {
    readFile(event, filePath);
    this.setState({ filePath });
  }

  handleFileLoad(event, content) {
    this.setState({ content })

  }

  handleFileSave() {
    saveFile(this.state);
  }

  handleFileSaved(event, updatedNote, shouldIncrementCounter) {
    // NOTE update state as needed
    // NOTE update count IF needed

    if (shouldIncrementCounter) {
      let currentNoteCount = localStorage.getItem('note-count');
      console.log(currentNoteCount)
      localStorage.setItem('note-count', ++currentNoteCount);
    }
    this.setState(updatedNote);
  }

  handleContentChange() {
    let { value } = event.target;
    let wordCount = value.length > 0 ? value.match(/\b\w+\b/gim).length : 0;
    let noteInfo = Object.assign({}, this.state);
    noteInfo.note.content = value;
    noteInfo.note.wordCount = wordCount;

    this.setState(noteInfo)
  }
  render() {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log(this.state);

    return (
      <div className="note grid" >
        <Header {...this.props} />
        <div className="container grid note--content">
          <Sidebar options={menuOptions} />
          {/* TODO Fix tab not putting multiple spaces. SUPER ANNOYING*/}
          <textarea onChange={this.handleContentChange} className="note--text" value={this.state.content} />
        </div>
      </div>
    );
  }
}
