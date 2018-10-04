import React, { Component } from 'react'
import { remote, ipcRenderer } from 'electron';
import Header from '../components/Header/Header';
const mainProcess = remote.require('./background');
export default class componentName extends Component {

  constructor(props) {
    super(props);

    this.state = {
      noteText: ""
    }

    /* Bindings */
    this.handleFileOpen = this.handleFileOpen.bind(this);
    this.handleFileLoad = this.handleFileLoad.bind(this);
    this.handleNoteTextChange = this.handleNoteTextChange.bind(this);

    this.menuOptions = [
      {
        action: 'Bookmark',
        icon: 'far fa-bookmark fa-lg',
        cb: () => console.log(('bookmark'))
      },
      {
        action: 'Open',
        icon: 'far fa-folder-open fa-lg',
        cb: () => this.handleFileOpen()
      },
      {
        action: 'Save',
        icon: 'far fa-save',
        cb: () => console.log('save note')
      },


    ];

  }

  componentDidMount() {
    ipcRenderer.on('load-file-reply', this.handleFileLoad);
  }

  componentWillUnmount() {
    ipcRenderer.removeEventListener('load-file-reply');
  }

  handleFileLoad(event, contents) {
    console.log(contents);
    this.setState({ noteText: contents });
    // const nodeTextElement = document.getElementsByClassName('note--text')[0];
    // nodeTextElement.value = contents;
  }

  handleNoteTextChange(e) {
    let { value } = e.target;
    this.setState({ noteText: value });
  }

  handleFileOpen() {
    // console.log('click');

    let currentWindow = remote.currentWindow;
    let filePath = mainProcess.getUserSelectedFilePath(currentWindow);

    let title = document.getElementsByClassName('header--title')[0];
    title.innerHTML = filePath;
    ipcRenderer.send('load-file', filePath);
  }

  render() {
    return (
      <div className="grid note">
        <Header menuOptions={this.menuOptions} view={this.props.view} />
        <textarea
          onChange={this.handleNoteTextChange}
          value={this.state.noteText}
          className="note--text"></textarea>
      </div>
    )
  }
}
