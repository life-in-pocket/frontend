import React from "react";

export const FormInputClass =
    "p-2 border-2 rounded-xl bg-light text-text-dark outline-none focus:border-second-accent focus:shadow-[0_0_5px_var(--second-accent-color)] hover:border-second-accent";

export const FormContainerClass = "flex items-center gap-2";

interface BlockFormProps {
    children: React.ReactNode;
    onClose: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onDelete?: (() => void) | null;
    title: string;
    buttons?: boolean;
    buttonName?: string;
}

function BlockForm({ children, onClose, onSubmit, onDelete = null, title, buttons, buttonName }: BlockFormProps) {
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (onDelete) {
            onDelete();
        } else {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-10 bg-dark/50"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="block-form-title"
                className="fixed top-1/2 left-1/2 z-20 flex w-[50%] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl bg-sidebar p-5"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Закрити"
                    className="absolute top-3 right-3 z-30 cursor-pointer hover:text-second-accent"
                >
                    <svg aria-hidden="true" focusable="false" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18" />
                        <path d="M6 6L18 18" />
                    </svg>
                </button>

                <h2 id="block-form-title" className="mb-5 text-5xl font-semibold">
                    {title}
                </h2>

                <form className="flex flex-col gap-3 text-2xl" onSubmit={onSubmit}>
                    {children}

                    {buttons && (
                        <div className="flex items-end justify-end gap-4">
                            <button
                                type="submit"
                                className="cursor-pointer rounded-xl bg-accept px-4 py-2 font-semibold"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="cursor-pointer rounded-xl bg-reject px-4 py-2 font-semibold"
                            >
                                {buttonName}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default BlockForm;