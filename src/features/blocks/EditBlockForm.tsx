import "./EditBlockForm.css"
import ProgresBar from "../../components/ProgresBar/ProgresBar";
import BlockForm from "../../components/BlockForm/BlockForm";
import React, { useState } from "react";

interface EditBlockFormProps {
    onClose: () => void;
    onDelete: () => void;
    onSave: (updatedBlock: { title: string; time: number; target: number }) => void;
    initialTitle: string;
    initialTime: number;
    initialTarget: number;
}

function EditBlockForm({ onClose, onDelete, onSave, initialTitle, initialTime, initialTarget }: EditBlockFormProps) {

    const [title, setTitle] = useState(initialTitle);
    const [time, setTime] = useState(initialTime);
    const [target, setTarget] = useState(initialTarget);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => setTime(event.target.valueAsNumber);
    const handleTargetChange = (event: React.ChangeEvent<HTMLInputElement>) => setTarget(event.target.valueAsNumber);  

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave({ title, time, target });
        onClose();
    }

    return (
        <BlockForm onClose={onClose} onSubmit={handleSubmit} onDelete={onDelete} title="Edit Block" buttons={true} buttonName="Delete" >
            <div className="form-container block-title-container">
                <label htmlFor="block-title">Title:</label>
                <input className="form-input" 
                    type="text" 
                    id="block-title" 
                    name="block-title" 
                    defaultValue={title}
                    onChange={handleTitleChange} />
                </div>
                    
            <div className="form-container block-time-container">
                <label htmlFor="block-time">Time (hours):</label>
                <input className="form-input" 
                    type="number" 
                    id="block-time" 
                    name="block-time"
                    defaultValue={time} 
                    step="0.5" 
                    min="0" 
                    max="24"
                    onChange={handleTimeChange} />
            </div>

            <div className="form-container block-target-container">
                <label htmlFor="block-target">Target:</label>
                <input 
                    className="form-input" 
                    type="number" 
                    id="block-target" 
                    name="block-target" 
                    defaultValue={target} 
                    step="0.5" 
                    min="0" 
                    max="24" 
                    onChange={handleTargetChange}/>
            </div>

            <ProgresBar currentTime={time} targetTime={target} />

        </BlockForm>
    )
}

export default EditBlockForm