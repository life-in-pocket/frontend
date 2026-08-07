import "../../assets/css/features/day-dashboard/CreateBlockForm.css"
import "../../assets/css/object/Buttons.css"
import { useState } from "react";

function CreateBlockForm({ onCreate, onClose, title, setTitle, time, setTime, target, setTarget }) {

    const [temporaryTitle, setTemporaryTitle] = useState("New Block");
    const [temporaryTime, setTemporaryTime] = useState(0);
    const [temporaryTarget, setTemporaryTarget] = useState(1);

    const handleSubmit = (event) => {
        setTitle(temporaryTitle);
        setTime(temporaryTime);
        setTarget(temporaryTarget);
        event.preventDefault();
        onCreate();
        onClose();
    };

    return (
        <div className="create-block-form-overlay">
            <div className="create-block-container">
                <h3 className="create-block-form-title">Create New Block</h3>
                <form className="create-block-form" onSubmit={handleSubmit}>

                    <div className="create-block-form-container">
                        <label htmlFor="create-title" className="create-block-form-label">Title:</label>
                        <input id="create-title" type="text" value={temporaryTitle} onChange={(e) => setTemporaryTitle(e.target.value)} placeholder="Block Title" />
                    </div>

                    <div className="create-block-form-container">
                        <label htmlFor="create-time" className="create-block-form-label">Time:</label>
                        <input id="create-time" type="number" value={temporaryTime} onChange={(e) => setTemporaryTime(e.target.value)} placeholder="Time" />
                    </div>

                    <div className="create-block-form-container">
                        <label htmlFor="create-target" className="create-block-form-label">Target:</label>
                        <input id="create-target" type="number" value={temporaryTarget} onChange={(e) => setTemporaryTarget(e.target.value)} placeholder="Target" />
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