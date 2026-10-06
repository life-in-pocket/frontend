import "../../assets/css/features/day-dashboard/CreateBlockForm.css"
import "../../assets/css/object/Buttons.css"
import { useState } from "react";

function CreateBlockForm({ onCreate, onClose, title, time, target }: { onCreate: (title: string, time: number, target: number) => void; onClose: () => void; title: string; time: number; target: number }) {

    const [temporaryTitle, setTemporaryTitle] = useState(title);
    const [temporaryTime, setTemporaryTime] = useState(time);
    const [temporaryTarget, setTemporaryTarget] = useState(target);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onCreate(temporaryTitle, temporaryTime, temporaryTarget);
        onClose();
    };

    return (
        <div className="create-block-form-overlay">
            <div className="create-block-container">
                <h3 className="create-block-form-title">Create New Block</h3>
                <form className="create-block-form" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>

                    <div className="create-block-form-container">
                        <label htmlFor="create-title" className="create-block-form-label">Title:</label>
                        <input id="create-title" type="text" value={temporaryTitle} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTemporaryTitle(e.target.value)} placeholder="Block Title" />
                    </div>

                    <div className="create-block-form-container">
                        <label htmlFor="create-time" className="create-block-form-label">Time:</label>
                        <input id="create-time" type="number" value={temporaryTime} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTemporaryTime(e.target.valueAsNumber)} placeholder="Time" />
                    </div>

                    <div className="create-block-form-container">
                        <label htmlFor="create-target" className="create-block-form-label">Target:</label>
                        <input id="create-target" type="number" value={temporaryTarget} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTemporaryTarget(e.target.valueAsNumber)} placeholder="Target" />
                    </div>

                    <div className="create-block-form-buttons">
                        <button className="block-button btn-save" type="submit">Create</button>
                        <button className="block-button btn-delete" type="button" onClick={onClose}>Close</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CreateBlockForm