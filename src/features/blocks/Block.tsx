import EditBlockForm from "./EditBlockForm";
import ProgresBar from "../../components/ProgresBar/ProgresBar";
import BlockNote from "./BlockNote";
import { useState } from "react";
import { updateTime, updateTask, updateDescription } from "../../api/tasks";
import { Task } from "../../types/block";

interface BlockProps {
    block: Task;
    deleteBlock: () => void;
    isEditing: boolean;
}

function Block({ block, deleteBlock, isEditing }: BlockProps) {
    const [isEditingBlock, setIsEditingBlock] = useState(false);
    const [time, setTime] = useState(block.time);
    const [target, setTarget] = useState(block.target);
    const [title, setTitle] = useState(block.title);
    const [description, setDescription] = useState(block.description ?? "");
    const [isTimeUpdating, setIsTimeUpdating] = useState(false);

    const changeTime = (delta: number, event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (isTimeUpdating) return;
        const newTime = time + delta;
        if (newTime < 0) return;

        setIsTimeUpdating(true);
        updateTime(block.id, newTime)
            .then(() => setTime(newTime))
            .catch((error) => console.error(`Failed to update time for block ${block.id}:`, error))
            .finally(() => setIsTimeUpdating(false));
    };

    const handleSaveMethod = (updatedBlock: { title: string; time: number; target: number }) => {
        setTitle(updatedBlock.title);
        setTime(updatedBlock.time);
        setTarget(updatedBlock.target);
        updateTask(block.id, updatedBlock).catch((error) =>
            console.error(`Failed to update block ${block.id}:`, error)
        );
    };

    const handleSaveDescription = (newDescription: string) => {
        updateDescription(block.id, newDescription)
            .then(() => setDescription(newDescription))
            .catch((error) => console.error(`Failed to update description for block ${block.id}:`, error));
    };

    const openEditor = () => setIsEditingBlock(true);
    const closeEditor = () => setIsEditingBlock(false);

    return (
        <article
            className="relative isolate flex flex-col gap-3 rounded-2xl border-4 border-accent p-4 before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-accent before:opacity-40 before:content-['']"
            onClick={() => openEditor()}
        >
            <h3 className="text-[2rem] font-semibold">{title}</h3>

            <div className="flex items-center justify-center gap-10">
                {!isEditing && (
                    <button
                        type="button"
                        onClick={(event) => {
                            changeTime(-0.5, event)
                            closeEditor()
                        }}
                        disabled={isTimeUpdating}
                        aria-label="Decrise time"
                        className="cursor-pointer"
                    >
                        <svg aria-hidden="true" focusable="false" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12H23" />
                        </svg>
                    </button>
                )}

                    <span className="text-[1.5rem]">{time} hours</span>

                {!isEditing && (
                    <button
                        type="button"
                        onClick={(event) => {
                            changeTime(0.5, event)
                            closeEditor()
                        }}                        disabled={isTimeUpdating}
                        aria-label="Increase time"
                        className="cursor-pointer"
                    >
                        <svg aria-hidden="true" focusable="false" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 1V23M1 12H23" />
                        </svg>
                    </button>
                )}
            </div>

            <ProgresBar currentTime={time} targetTime={target} />
            <p className="text-xl">target: {time}/{target}</p>

            {isEditing && isEditingBlock && (
                <EditBlockForm
                    onClose={closeEditor}
                    onDelete={deleteBlock}
                    onSave={handleSaveMethod}
                    initialTitle={title}
                    initialTime={time}
                    initialTarget={target}
                />
            )}
            {!isEditing && isEditingBlock && (
                <BlockNote
                    onClose={closeEditor}
                    onSave={handleSaveDescription}
                    block={{ ...block, description }}
                />
            )}
        </article>
    );
}

export default Block;