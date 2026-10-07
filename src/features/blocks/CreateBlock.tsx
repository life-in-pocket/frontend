import { useState } from "react";
import "./CreateBlock.css"
import CreateBlockForm from "./CreateBlockForm";

function CreateBlock({ onSave, title, time, target, isEditing }: { onSave: (title: string, time: number, target: number) => void; title: string; time: number; target: number; isEditing: boolean }) {

const [isFormOPen, setIsFormOpen] = useState(false);
    
    return (
        <>
            {isFormOPen && <CreateBlockForm 
                onCreate={onSave}
                onClose={() => {setIsFormOpen(false)}} 
                title={title} 
                time={time} 
                target={target} 
            />}

            <div className="create-blok-card" 
            style={{ display: isEditing ? 'flex' : 'none' }}
                onClick={() => {
                    setIsFormOpen(true);
                }
            }>
                <svg className="create-blok-card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1V23M1 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

            </div>
        </>
    );
}

export default CreateBlock;