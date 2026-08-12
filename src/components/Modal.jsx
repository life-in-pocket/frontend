import React, {useState} from "react"
import DevelopmentBlok from "../features/day-dashboard/DevelopmentBlok"
import СreateBlokCard from "../features/day-dashboard/CreateBlokCard"
import "../assets/css/components/Modal.css"

function Modal() {
    const blockList = [
        { id: 1, title: "Selfdevelopment", time: 7.5, target: 8 },
        { id: 2, title: "Work", time: 5, target: 6 }
    ];

    const [isEditing, setIsEditing] = useState(false);
    const [blocks, setBlocks] = useState(blockList);
    const [newBlockTitle, setNewBlockTitle] = useState("New Block");
    const [newBlockTime, setNewBlockTime] = useState(0);
    const [newBlockTarget, setNewBlockTarget] = useState(1);
    const [datatime, setDatatime] = useState(new Date());

    const editDashboard = () => {
        setIsEditing(!isEditing);
    };

    const createNewBlock = () => {
        setBlocks([...blocks, { id: blocks.length + 1, title: newBlockTitle, time: newBlockTime, target: newBlockTarget }]);
    };

    const deleteBlock = (id) => {
        setBlocks(blocks.filter(block => block.id !== id));
    }

    const updateDatatime = (newDate) => {
        setDatatime(newDate);
    }

    const dateBefore = (event) => {
        const newDate = new Date(datatime);
        newDate.setDate(newDate.getDate() - 1);
        setDatatime(newDate);
    }

    const dateAfter = (event) => {
        const newDate = new Date(datatime);
        newDate.setDate(newDate.getDate() + 1);
        setDatatime(newDate);
    }

    return (
        <div className="modal">
            <div className="modal-header">
                <div className="modal-time-picker">
                    <svg onClick={dateBefore} className="modal-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="modal-clock">{datatime.toLocaleDateString()}</span>
                    <svg onClick={dateAfter} className="modal-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                {blocks.map(block => (
                    <DevelopmentBlok key={block.id} deleteBlock={() => deleteBlock(block.id)} title={block.title} time={block.time} target={block.target} isEditing={isEditing} />
                ))}
                <СreateBlokCard 
                onAdd={createNewBlock} 
                title={newBlockTitle} 
                setTitle={setNewBlockTitle} 
                time={newBlockTime} 
                setTime={setNewBlockTime} 
                target={newBlockTarget} 
                setTarget={setNewBlockTarget} 
                isEditing={isEditing}
                />     
            </div>
        </div>
    )
}

export default Modal