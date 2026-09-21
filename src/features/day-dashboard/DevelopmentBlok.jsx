import React, { useState } from "react";
import "../../assets/css/features/day-dashboard/DevelopmentBlok.css"
import ProgresBar from "../../element/ProgresBar";
import EditForm from "./EditForm";
import Note from "./Note";
import { updateTime, updateTask, updateDescription } from "../../api/tasks";

function DevelopmentBlok({ block, isEditing, deleteBlock }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [time, setTime] = useState(block.time);
    const [title, setTitle] = useState(block.title);
    const [target, setTarget] = useState(block.target);
    const [description, setDescription] = useState(block.description || "");

    const [isTimeUpdating, setIsTimeUpdating] = useState(false);

    const timeIncrease = (event) => {
        event.stopPropagation();
        if (isTimeUpdating) return;

        const newTime = time + 0.5;
        setIsTimeUpdating(true);

        updateTime(block.id, { title, time: newTime, target })
            .then(() => {
                setTime(newTime);
            })
            .catch((error) => {
                console.error(`Failed to update time for block with id ${block.id}:`, error);
            })
            .finally(() => {
                setIsTimeUpdating(false);
            });
    };

    const timeDecrease = (event) => {
        event.stopPropagation();
        if (isTimeUpdating || time <= 0) return;

        const newTime = time - 0.5;
        setIsTimeUpdating(true);

        updateTime(block.id, { title, time: newTime, target })
            .then(() => {
                setTime(newTime);
            })
            .catch((error) => {
                console.error(`Failed to update time for block with id ${block.id}:`, error);
            })
            .finally(() => {
                setIsTimeUpdating(false);
            });
    };

    const handleSaveMethod = (updatedBlock) => {
        setTitle(updatedBlock.title);
        setTime(updatedBlock.time);
        setTarget(updatedBlock.target);
        updateTask(block.id, updatedBlock).catch((error) => {
            console.error(`Failed to update block with id ${block.id}:`, error);
        });
    }

    const handleSaveDescription = (description) => {
        updateDescription(block.id, { ...block, description }).then(() => {
            setDescription(description);
        }).catch((error) => {
            console.error(`Failed to update description for block with id ${block.id}:`, error);
        });
    }

    const openForm = () => {
        setIsFormOpen(true);
    };

    return (
        <article className="development-blok" onClick={openForm}>
            <h3 className="blok-title">{title}</h3>
            <div className="time-container">
                <a onClick={(e) => timeDecrease(e)} style={{display: `${isEditing ? 'none' : 'block'}`}}>
                    <svg className="blok-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1V23M1 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
                <time className="blok-time">{time} hours</time>
                <a onClick={(e) => timeIncrease(e)} style={{display: `${isEditing ? 'none' : 'block'}`}}>
                    <svg className="blok-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1V23M1 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
            </div>

            <ProgresBar currentTime={time} targetTime={target} />
            <p className="blok-description">target: {time}/{target}</p>

            {isEditing && isFormOpen && <EditForm onClose={() => setIsFormOpen(false)} onDelete={deleteBlock} onSave={handleSaveMethod} initialTitle={title} initialTime={time} initialTarget={target} />}
            {!isEditing && isFormOpen && <Note onClose={() => setIsFormOpen(false)} onSave={(description) => handleSaveDescription(description)} block={{...block, description}}/>}
        </article>
    )
}

export default DevelopmentBlok