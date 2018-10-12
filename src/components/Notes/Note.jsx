import React, { Component } from 'react'
import { ipcRenderer } from 'electron';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar'

import {
    openFile,
    readFile,
    saveFile,
    countWords
} from '../../utils/tools';

let menuOptions = [
    {
        action: 'Home',
        icon: 'fas fas-home fa-lg',
        cb: () => { },
        arg: ['']

    },
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

        /* SECTION Bindings */
        this.handleFileLoad = this.handleFileLoad.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleFileSave = this.handleFileSave.bind(this);
        this.handleFileSaved = this.handleFileSaved.bind(this);
        this.handleReadFile = this.handleReadFile.bind(this);
        this.delay = 5000;
        this.saveFileTimer = null;
        this.timerEvent = new CustomEvent('time-spent-timer', { detail: new Date() });
        /* !SECTION  */
        const maybeState = Object.assign({}, this.props.location.state);
        this.state = Object.keys(maybeState).length > 0 ? maybeState : {
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
                extension: '.txt',
                tags: []
            }
        };
    }

    /* SECTION lifecycle methods */
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

        if (this.props.match.url !== '/note/new' && this.state.note.content === "") {
            let { noteId } = this.props.match.params;
            let thisNote = JSON.parse(localStorage.getItem('recentNotes')).filter((ele) => ele.meta.fileName === noteId);
            this.setState(thisNote[0]);
        }
    }

    componentWillUnmount() {
        ipcRenderer.removeListener('open-file-reply');
        ipcRenderer.removeListener('load-file-reply');
    }
    /* !SECTION  */

    /* SECTION Methods */
    handleReadFile(event, filePath) {
        readFile(event, filePath);
        let tempState = this.state;

        filePath = filePath.split('/');
        tempState.meta.fileName = filePath[filePath.length - 1].split('.')[0];
        tempState.meta.extension = '.' + filePath[filePath.length - 1].split('.')[1];
        tempState.note.filePath = filePath.slice(0, -1).join('/');

        this.setState(tempState);
    }

    handleFileLoad(event, content) {
        let tempState = this.state;

        tempState.note.content = content;
        tempState.note.wordCount = countWords(content);

        this.setState(tempState);
    }

    handleFileSave() {
        saveFile(this.state);
    }

    handleFileSaved(event, updatedNote, shouldIncrementCounter) {
        // NOTE update state as needed
        // NOTE update count IF needed

        if (shouldIncrementCounter) {
            let currentNoteCount = localStorage.getItem('note-count');
            localStorage.setItem('note-count', ++currentNoteCount);
        }
        this.props.addToRecent(this.state, () => {
            this.setState(updatedNote);
        });
    }

    handleContentChange() {
        let { value } = event.target;
        let wordCount = countWords(value);
        let noteInfo = Object.assign({}, this.state);

        noteInfo.note.content = value;
        noteInfo.note.wordCount = wordCount;

        this.setState(noteInfo)
    }
    /* !SECTION  */
    render() {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        console.log(this.state);
        console.log(this.props.location.state);
        console.log(this.props.match);



        return (
            <div className="note grid" >
                <Header {...this.props} />
                <div className="container grid note--content">
                    <Sidebar options={menuOptions} />
                    {/* TODO Fix tab not putting multiple spaces. SUPER ANNOYING*/}
                    <textarea onChange={this.handleContentChange} className="note--text" value={this.state.note.content} />
                </div>
            </div>
        );
    }
}
