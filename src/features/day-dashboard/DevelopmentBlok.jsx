import React, { useState } from "react";
import "../../assets/css/features/day-dashboard/DevelopmentBlok.css"
import ProgresBar from "../../element/ProgresBar";
import EditForm from "./EditForm";

function DevelopmentBlok({ isEditing }) {
    const [time, setTime] = useState(7.5);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [title, setTitle] = useState("Selfdevelopment");
    const [target, setTarget] = useState(8);

    const timeIncrease = () => {
        setTime(prevTime => prevTime + 0.5);
    };

    const timeDecrease = () => {
        if (time > 0) {
            setTime(prevTime => prevTime - 0.5);
        }
    }

    const openForm = () => {
        setIsFormOpen(true);
    };

    return (
        <article className="development-blok" onClick={openForm}>
            <h3 className="blok-title">{title}</h3>
            <div className="time-container">
                <a onClick={timeDecrease} style={{display: `${isEditing ? 'none' : 'block'}`}}>
                    <svg className="blok-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1V23M1 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
                <time className="blok-time">{time} hours</time>
                <a onClick={timeIncrease} style={{display: `${isEditing ? 'none' : 'block'}`}}>
                    <svg className="blok-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1V23M1 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
            </div>

            <ProgresBar currentTime={time} targetTime={target} />
            <p className="blok-description">target: {time}/{target}</p>

            {isEditing && isFormOpen && <EditForm onClose={() => setIsFormOpen(false)} title={title} time={time} target={target} />}
        </article>
    )
}

export default DevelopmentBlok