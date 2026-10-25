import React, { useState } from "react";
import BlockForm from "../../components/BlockForm/BlockForm";

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave(description);
        onClose();
    };

    return (
        <BlockForm
            onClose={onClose}
            onSubmit={handleSubmit}
            title={`Note for ${block.title}`}
            buttons
            buttonName="Close"
        >
            <label htmlFor="block-note" className="sr-only">
                Note
            </label>
            <textarea
                id="block-note"
                name="block-note"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Write note..."
                className="h-90 w-full resize-none p-2 text-xl outline-none focus:border-second-accent focus:shadow-[0_0_5px_var(--second-accent-color)]"
            />
        </BlockForm>
    );
}

export default BlockNote;