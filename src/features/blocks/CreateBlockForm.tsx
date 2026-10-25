import { useState } from "react";
import ProgresBar from "../../components/ProgresBar/ProgresBar";
import BlockForm, { FormInputClass, FormContainerClass } from "../../components/BlockForm/BlockForm";

interface CreateBlockFormProps {
    onCreate: (title: string, time: number, target: number) => void;
    onClose: () => void;
    title: string;
    time: number;
    target?: number;
}

function CreateBlockForm({ onCreate, onClose, title, time, target = 1 }: CreateBlockFormProps) {
    const [temporaryTitle, setTemporaryTitle] = useState(title);
    const [temporaryTime, setTemporaryTime] = useState(time);
    const [temporaryTarget, setTemporaryTarget] = useState(target);

    const parseNumber = (value: string, fallback: number) => {
        const parsed = Number.parseFloat(value);
        return Number.isNaN(parsed) ? fallback : parsed;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onCreate(temporaryTitle.trim(), temporaryTime, temporaryTarget);
        onClose();
    };

    return (
        <BlockForm onClose={onClose} onSubmit={handleSubmit} title="Create New Block" buttons buttonName="Cancel">
            <div className={FormContainerClass}>
                <label htmlFor="block-title">Title:</label>
                <input
                    className={FormInputClass}
                    type="text"
                    id="block-title"
                    name="block-title"
                    value={temporaryTitle}
                    onChange={(e) => setTemporaryTitle(e.target.value)}
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
                    value={temporaryTime}
                    step="0.5"
                    min="0"
                    max="24"
                    onChange={(e) => setTemporaryTime(parseNumber(e.target.value, temporaryTime))}
                />
            </div>

            <div className={FormContainerClass}>
                <label htmlFor="block-target">Target:</label>
                <input
                    className={FormInputClass}
                    type="number"
                    id="block-target"
                    name="block-target"
                    value={temporaryTarget}
                    step="0.5"
                    min="0"
                    max="24"
                    onChange={(e) => setTemporaryTarget(parseNumber(e.target.value, temporaryTarget))}
                />
            </div>

            <ProgresBar currentTime={temporaryTime} targetTime={temporaryTarget} />
        </BlockForm>
    );
}

export default CreateBlockForm;