import React, { useState } from "react";
import "../../assets/css/features/day-dashboard/DevelopmentBlok.css"
import ProgresBar from "../../element/ProgresBar";

function DevelopmentBlok() {
    const [time, setTime] = useState(7.5);

    const timeIncrease = () => {
        setTime(prevTime => prevTime + 0.5);
    };

    const timeDecrease = () => {
        if (time > 0) {
            setTime(prevTime => prevTime - 0.5);
        }
    }

    return (
        <article className="development-blok">
            <h3 className="blok-title">Selfdevelopment</h3>
            <div className="time-container">
                <a onClick={timeDecrease}>
                    <svg className="blok-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1V23M1 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
                <time className="blok-time">{time} hours</time>
                <a onClick={timeIncrease}>
                    <svg className="blok-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1V23M1 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
            </div>
            <ProgresBar currentTime={time} targetTime={8} />
            <p className="blok-description">target: {time}/8</p>
        </article>
    )
}

export default DevelopmentBlok