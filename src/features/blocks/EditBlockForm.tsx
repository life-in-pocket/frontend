import ProgresBar from "../../components/ProgresBar/ProgresBar";
import BlockForm, { FormInputClass, FormContainerClass } from "../../components/BlockForm/BlockForm";
import { useState } from "react";

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

    const parseNumber = (value: string, fallback: number) => {
        const parsed = Number.parseFloat(value);
        return Number.isNaN(parsed) ? fallback : parsed;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave({ title: title.trim(), time, target });
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

            <ProgresBar currentTime={time} targetTime={target} />
        </BlockForm>
    );
}

export default EditBlockForm;