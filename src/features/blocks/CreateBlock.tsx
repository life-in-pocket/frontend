import { useState } from "react";
import "./CreateBlock.css"
import CreateBlockForm from "./CreateBlockForm";

function CreateBlock({ onSave, isEditing }: { onSave: (title: string, time: number, target: number) => void; isEditing: boolean }) {

const [isFormOPen, setIsFormOpen] = useState(false);
    
    return (
        <>
            {isFormOPen && <CreateBlockForm 
                onCreate={onSave}
                onClose={() => {setIsFormOpen(false)}} 
                title={"New Block"} 
                time={1} 
                target={2} 
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