import React, { useState } from "react";
import "../../assets/css/features/day-dashboard/CreateBlokCard.css"
import CreateBlockForm from "./CreateBlockForm";

function CreateBlokCard({ onAdd, title, setTitle, time, setTime, target, setTarget, isEditing }) {

    const [isFormOPen, setIsFormOpen] = useState(false);
    
    return (
        <>
            {isFormOPen && <CreateBlockForm 
                onCreate={onAdd}
                onClose={() => {setIsFormOpen(false)}} 
                title={title} 
                setTitle={setTitle} 
                time={time} 
                setTime={setTime} 
                target={target} 
                setTarget={setTarget} />}

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

export default CreateBlokCard;