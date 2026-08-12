import React, { useState } from "react";
import "../assets/css/element/DataPicker.css";

function DataPicker() {

    const [datatime, setDatatime] = useState(new Date());

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
        <div className="time-picker">
            <svg onClick={dateBefore} className="time-picker-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="time-picker-clock">{datatime.toLocaleDateString()}</span>
            <svg onClick={dateAfter} className="time-picker-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    )
}

export default DataPicker