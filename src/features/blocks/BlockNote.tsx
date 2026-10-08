import "./BlockNote.css"
import React, { useState } from "react"
import BlockForm from "../../components/BlockForm/BlockForm"

interface BlockNoteProps {
    onClose: () => void;
    onSave: (description: string) => void;
    block: {
        title: string;
        description: string;
    };
}

function BlockNote({ onClose, onSave, block }: BlockNoteProps) {

    const [description, setDescription] = useState(block.description);

    return (
        <BlockForm 
            onClose={onClose} 
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                onSave(description);
            }} 
            title={`Note for ${block.title}`} 
            buttons={true} 
            buttonName="Close"
            >
            <textarea 
                className="note-text"
                value={description}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value)} placeholder="Write your note...">
            </textarea>
        </BlockForm>
    )
}

export default BlockNote