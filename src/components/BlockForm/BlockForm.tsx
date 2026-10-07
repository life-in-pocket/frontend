import "./BlockForm.css";

function BlockForm({ children, onClose, onSubmit }: { children: React.ReactNode; onClose: () => void; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {

    return (
        <div className="block-form-overlay">
            <div className="block-container">

                <div className="block-form-close">
                    <button 
                        onClick={(event) => {
                            event.stopPropagation();
                            onClose();
                        }
                        }
                        type="button"
                        className="block-form-close-button"
                        >
                        <svg className="block-form-close-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                <h3 className="block-form-title">Create New Block</h3>

                <form className="block-form" onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}>
                    {children}

                    <div className="form-container block-buttons-container">
                        <button className="block-button btn-save" type="submit">Save</button>
                        <button className="block-button btn-delete" type="button" onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BlockForm