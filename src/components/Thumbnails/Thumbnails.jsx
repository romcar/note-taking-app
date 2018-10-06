import React from 'react'
import { Link } from 'react-router-dom';
export default (props) => {
    return (
        <div className="thumbnails">
            {/* TODO Implement some sort of thumbnail system with tags */}
            {/* NOTE map recently opened/used notes */}
            {!!props.recentNotes.length ? props.recentNotes.map((note) => {
                return (
                    <div className="thumbnail">
                        <h3 className="thumbnail--header">{note.filePath}</h3>
                        <span className="thumbnail--word-count">{`Word Count: ${note.wordCount}`}</span>
                        <span className="thumbnail--time-spent">{`Time Spent: ${note.timeSpent}`}</span>
                    </div>
                )
            }) :
                <div onClick={() => console.log('new note created')} className="thumbnail">
                    <Link to="/note" className="new-note-icon"><i className="fas fa-plus fa-5x"></i></Link>
                </div>}

        </div>
    )
}
