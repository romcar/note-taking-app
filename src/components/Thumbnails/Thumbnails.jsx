import React from 'react'
import { Link, Route } from 'react-router-dom';
import Note from '../Notes/Note';
export default (props) => {
    return (
        <div className="thumbnails">
            {/* TODO Implement some sort of thumbnail system with tags */}
            {/* NOTE map recently opened/used notes */}
            {props.recentNotes.length ? props.recentNotes.map((note) => {
                return (
                    <div key={`${note.meta.fileName}`} className={`thumbnail`}>
                        <Link to={{
                            pathname: `/note/${note.meta.fileName}`,
                            state: note
                        }}>
                            <h3 className="thumbnail--header">{note.meta.fileName}</h3>
                            <span className="thumbnail--word-count">{`Word Count: ${note.note.wordCount}`}</span>
                            <span className="thumbnail--time-spent">{`Time Spent: ${note.timeSpent}`}</span>
                            {/* TODO add tags to thumbnails */}
                            {' '}tags here
                        </Link>
                    </div>
                )
            }) :
                <div onClick={() => console.log('new note created')} className="thumbnail">
                    <Link to={{
                        pathname: "/note/new",
                        state: {
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
                        }
                    }} className="new-note-icon"><i className="fas fa-plus fa-5x"></i></Link>
                </div>}

        </div>
    )
}
