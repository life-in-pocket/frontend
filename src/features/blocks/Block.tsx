import { useState } from "react";
import ProgresBar from "../../components/ProgresBar/ProgresBar";
import EditForm from "./EditForm";
import Note from "./Note";
import { updateTime, updateTask, updateDescription } from "../../api/tasks";
import { Task } from "../../pages/Modal";
import "./Block.css";

function Task({ block, deleteBlock, isEditing }: { block: Task, deleteBlock: () => void, isEditing: boolean }) {
    const [isEditingBlock, setIsEditingBlock] = useState<boolean>(false);
    const [time, setTime] = useState<number>(block.time);
    const [target, setTarget] = useState<number>(block.target);
    const [title, setTitle] = useState<string>(block.title);
    const [description, setDescription] = useState<string | null>(block.description || "");

    const [isTimeUpdating, setIsTimeUpdating] = useState<boolean>(false);

    const timeIncrease = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.stopPropagation();
        if (isTimeUpdating) return;

        const newTime = time + 0.5;
        setIsTimeUpdating(true);

        updateTime(block.id, newTime)
            .then(() => {
                setTime(newTime);
            })
            .catch(error => {
                console.error("Failed to update time:", error);
            })
            .finally(() => {
                setIsTimeUpdating(false);
            });
    };

    const timeDecrease = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.stopPropagation();
        if (isTimeUpdating || time <= 0) return;

        const newTime = time - 0.5;
        setIsTimeUpdating(true);

        updateTime(block.id, newTime)
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

    const handleSaveMethod = (updatedBlock: { title: string; time: number; target: number }) => {
        setTitle(updatedBlock.title);
        setTime(updatedBlock.time);
        setTarget(updatedBlock.target);
        updateTask(block.id, updatedBlock)
            .catch((error) => {
                console.error(`Failed to update block with id ${block.id}:`, error);
            });
    };

    const handleSaveDescription = (newDescription: string) => {
        updateDescription(block.id, { ...block, description: newDescription })
            .then(() => {
                setDescription(newDescription);
            }).catch((error) => {
                console.error(`Failed to update description for block with id ${block.id}:`, error);
            });
    };

    const toggleForm = () => {
        setIsEditingBlock(prev => !prev);
    }

    return (
        <article className="development-blok" onClick={toggleForm}>
            <h3 className="blok-title">{title}</h3>
            <div className="time-container">
                <a onClick={(e: React.MouseEvent<HTMLAnchorElement>) => timeDecrease(e)} style={{display: `${isEditing ? 'none' : 'block'}`}}>
                    <svg className="blok-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1V23M1 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
                <time className="blok-time">{time} hours</time>
                <a onClick={(e: React.MouseEvent<HTMLAnchorElement>) => timeIncrease(e)} style={{display: `${isEditing ? 'none' : 'block'}`}}>
                    <svg className="blok-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1V23M1 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
            </div>

            <ProgresBar currentTime={time} targetTime={target} />
            <p className="blok-description">target: {time}/{target}</p>

            {isEditing && isEditingBlock && <EditForm onClose={() => setIsEditingBlock(false)} onDelete={deleteBlock} onSave={handleSaveMethod} initialTitle={title} initialTime={time} initialTarget={target} />}
            {!isEditing && isEditingBlock && <Note onClose={() => setIsEditingBlock(false)} onSave={(description: string) => handleSaveDescription(description)} block={{...block, description}}/>}
        </article>
    )
}

export default Task;