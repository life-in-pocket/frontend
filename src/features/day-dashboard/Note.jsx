import "../../assets/css/features/day-dashboard/Note.css"
import { useState } from "react"

function Note({ onClose, title }) {

    const [text, setText] = useState("");

    const closeForm = (event) => {
        event.stopPropagation();
        onClose();
    }

    return (
        <div className="note-overlay">
            <div className="note">
                <div onClick={(event) => closeForm(event)} className="note-close">
                    <svg className="note-close-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                
                <h2 className="note-title">{title}</h2>
                <textarea 
                    className="note-text"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    placeholder="Write your note...">
                </textarea>
            </div>
        </div>
    )
}

export default Note