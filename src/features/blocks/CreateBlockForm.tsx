import "./CreateBlockForm.css"
import "../../assets/css//Buttons.css"
import { useState } from "react";
import ProgresBar from "../../components/ProgresBar/ProgresBar";
import BlockForm from "../../components/BlockForm/BlockForm";

function CreateBlockForm({ onCreate, onClose, title, time, target = 1 }: { onCreate: (title: string, time: number, target: number) => void; onClose: () => void; title: string; time: number; target: number }) {

    const [temporaryTitle, setTemporaryTitle] = useState(title);
    const [temporaryTime, setTemporaryTime] = useState(time);
    const [temporaryTarget, setTemporaryTarget] = useState(target);

        const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTemporaryTitle(event.target.value);
        const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => setTemporaryTime(event.target.valueAsNumber);
        const handleTargetChange = (event: React.ChangeEvent<HTMLInputElement>) => setTemporaryTarget(event.target.valueAsNumber);  

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onCreate(temporaryTitle, temporaryTime, temporaryTarget);
        onClose();
    };

    return (
        <BlockForm onClose={onClose} onSubmit={handleSubmit}>
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

export default CreateBlockForm