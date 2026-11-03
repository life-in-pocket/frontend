import ProgresBar from "../../components/ProgresBar/ProgresBar";
import BlockForm, { FormInputClass, FormContainerClass } from "../../components/BlockForm/BlockForm";
import { useState } from "react";

interface EditBlockFormProps {
    onClose: () => void;
    onDelete: () => void;
    onSave: (updatedBlock: { title: string; time: number; target: number, isActive: boolean }) => void;
    initialTitle: string;
    initialTime: number;
    initialTarget: number;
    initialIsActiveBlock: boolean;
}

function EditBlockForm({ onClose, onDelete, onSave, initialTitle, initialTime, initialTarget, initialIsActiveBlock }: EditBlockFormProps) {
    const [title, setTitle] = useState(initialTitle);
    const [time, setTime] = useState(initialTime);
    const [target, setTarget] = useState(initialTarget);
    const [isActiveBlock, setIsActiveBlock] = useState(initialIsActiveBlock);

    const parseNumber = (value: string, fallback: number) => {
        const parsed = Number.parseFloat(value);
        return Number.isNaN(parsed) ? fallback : parsed;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave({ title: title.trim(), time, target, isActive: isActiveBlock });
        onClose();
    };

    return (
        <BlockForm
            onClose={onClose}
            onSubmit={handleSubmit}
            onDelete={onDelete}
            title="Edit block"
            buttons
            buttonName="delete"
        >
            <div className={FormContainerClass}>
                <label htmlFor="block-title">Title:</label>
                <input
                    className={FormInputClass}
                    type="text"
                    id="block-title"
                    name="block-title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                />
            </div>

            <div className={FormContainerClass}>
                <label htmlFor="block-time">Time:</label>
                <input
                    className={FormInputClass}
                    type="number"
                    id="block-time"
                    name="block-time"
                    value={time}
                    step="0.5"
                    min="0"
                    max="24"
                    onChange={(event) => setTime(parseNumber(event.target.value, time))}
                />
            </div>

            <div className={FormContainerClass}>
                <label htmlFor="block-target">Target:</label>
                <input
                    className={FormInputClass}
                    type="number"
                    id="block-target"
                    name="block-target"
                    value={target}
                    step="0.5"
                    min="0"
                    max="24"
                    onChange={(event) => setTarget(parseNumber(event.target.value, target))}
                />
            </div>

            <div className={FormContainerClass}>
                <label htmlFor="block-notifications" className="select-none ">
                    Active block:
                </label>
                <button
                    id="block-notifications"
                    type="button"
                    role="switch"
                    aria-checked={isActiveBlock}
                    onClick={() => setIsActiveBlock(!isActiveBlock)}
                    className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--second-accent-color) ${
                    isActiveBlock ? "bg-second-accent" : "bg-gray-500"
                    }`}
                >
                    <span
                    aria-hidden="true"
                    className={`block size-6 rounded-full bg-white shadow transition-transform ${
                        isActiveBlock ? "translate-x-6" : "translate-x-0"
                    }`}
                    />
                </button>
            </div>

            <ProgresBar currentTime={time} targetTime={target} />
        </BlockForm>
    );
}

export default EditBlockForm;