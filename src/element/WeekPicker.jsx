import { useState, useEffect } from "react";
import "../assets/css/element/DataPicker.css";
import Calendar from "./Calendar";

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');        
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function WeekPicker({ onSave }) {

    const [firstDate, setFirstDate] = useState(new Date());
    const [lastDate, setLastDate] = useState(new Date());
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    useEffect(() => {
        countFirstAndLastDay(currentDate);
    }, []);

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    }

    const countFirstAndLastDay = (date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diffToMonday = day === 0 ? -6 : 1 - day;
        const firstDay = new Date(d);
        firstDay.setDate(d.getDate() + diffToMonday);
        const lastDay = new Date(firstDay);
        lastDay.setDate(firstDay.getDate() + 6);
        setFirstDate(formatDate(firstDay));
        setLastDate(formatDate(lastDay));
        onSave(firstDay, lastDay);
    };

    const handleDateChange = (date) => {
        setCurrentDate(date);
        countFirstAndLastDay(date);
        setIsCalendarOpen(false);
    }

    const dateBefore = (event) => {
        const newFirstDate = new Date(firstDate);
        const newLastDate = new Date(lastDate);
        newFirstDate.setDate(newFirstDate.getDate() - 7);
        setFirstDate(newFirstDate);
        newLastDate.setDate(newLastDate.getDate() - 7);
        setLastDate(newLastDate);
        onSave(newFirstDate, newLastDate);
    }

    const dateAfter = (event) => {
        const newFirstDate = new Date(firstDate);
        const newLastDate = new Date(lastDate);
        newFirstDate.setDate(newFirstDate.getDate() + 7);
        setFirstDate(newFirstDate);
        newLastDate.setDate(newLastDate.getDate() + 7);
        setLastDate(newLastDate);
        onSave(newFirstDate, newLastDate);
    }

    return (
        <>
            <div className="time-picker">
                <svg onClick={dateBefore} className="time-picker-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span onClick={toggleCalendar} className="time-picker-clock">{firstDate.toString()}  -  {lastDate.toString()}</span>
                <svg onClick={dateAfter} className="time-picker-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

            </div>

            {isCalendarOpen && <Calendar sellectedDate={currentDate} onClose={handleDateChange}/>}
        </>
    )
}

export default WeekPicker