import { useState } from "react";
import CreateBlockForm from "./CreateBlockForm";

interface CreateBlockProps {
    onSave: (title: string, time: number, target: number) => void;
    isEditing: boolean;
}

function CreateBlock({ onSave, isEditing }: CreateBlockProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <>
            {isFormOpen && (
                <CreateBlockForm
                    onCreate={onSave}
                    onClose={() => setIsFormOpen(false)}
                    title="New Block"
                    time={1}
                    target={2}
                />
            )}

            <button
                type="button"
                onClick={() => setIsFormOpen(true)}
                aria-label="Add Block"
                className={`${
                    isEditing ? "flex" : "hidden"
                } relative isolate flex-col items-center justify-center gap-3 h-full rounded-2xl p-4 cursor-pointer before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-primary/20 before:content-[''] hover:before:opacity-40`}
            >
                <svg aria-hidden="true" focusable="false" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1V23M1 12H23" />
                </svg>
            </button>
        </>
    );
}

export default CreateBlock;