import React, {useState} from "react"
import DevelopmentBlok from "../features/day-dashboard/DevelopmentBlok"
import "../assets/css/components/Modal.css"

function Modal() {
    const [isEditing, setIsEditing] = useState(false);

    const editDashboard = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="modal">
            <div className="modal-header">
                <div className="modal-time-picker">
                    <svg className="modal-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="modal-clock">29 June 2026</span>
                    <svg className="modal-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="modal-edit" onClick={editDashboard}>
                    <svg className="modal-edit-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 20H21M16.5 3.5C16.8978 3.10218 17.4374 2.87868 18 2.87868C18.5626 2.87868 19.1022 3.10218 19.5 3.5C19.8978 3.89782 20.1213 4.43742 20.1213 5C20.1213 5.56258 19.8978 6.10218 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
            <div className="modal-content">
                <DevelopmentBlok isEditing={isEditing} />
                <DevelopmentBlok isEditing={isEditing} />
                <DevelopmentBlok isEditing={isEditing} />
                <DevelopmentBlok isEditing={isEditing} />
                <DevelopmentBlok isEditing={isEditing} />
                <DevelopmentBlok isEditing={isEditing} />
                <СreateBlokCard style={{ display: isEditing ? 'block' : 'none' }} />     
            </div>
        </div>
    )
}

export default Modal