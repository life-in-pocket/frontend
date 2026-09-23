import "../assets/css/element/Calendar.css";
import { useState } from "react"

function Calendar({sellectedDate, onClose}) {

    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const mounths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const [newDate, setNewDate] = useState(sellectedDate);

    const year = newDate.getFullYear();
    const month = newDate.getMonth();

    const changeDay = (day) => {
        setNewDate(new Date(year, month, day));
    }

    const increaseMonth = () => {
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        if (month === 0) {
            year += 1;
        }
        setNewDate(new Date(year, month, newDate.getDate()));
    }

    const decreaseMonth = () => {
        let month = newDate.getMonth() - 1;
        let year = newDate.getFullYear();
        if (month === 11) {
            year -= 1;
        }
        setNewDate(new Date(year, month, newDate.getDate()));
    }

    const renderCalendarDays = () => {

        const days = [];

        const year = newDate.getFullYear();
        const month = newDate.getMonth();

        const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

        const daysInPrevMonth = new Date(year, month, 0).getDate();

        const firstDayIndex = new Date(year, month, 1).getDay();
        const startingOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

        for (let i = startingOffset - 1; i >= 0; i--) {
            const prevDayNum = daysInPrevMonth - i;
            days.push(
                <div key={`prev-${prevDayNum}`} className="calendar-day other-month">
                    {prevDayNum}
                </div>
            );
        }

        for (let day = 1; day <= daysInCurrentMonth; day++) {
            let isSelected = day === newDate.getDate();

            days.push(
                <div key={`current-${day}`} 
                    className={`calendar-day ${isSelected ? "select-day" : ""}`}
                    onClick={() => {changeDay(day)}}
                >
                    {day}
                </div>
            );
        }

        const totalRendered = days.length;
        const totalGridCells = totalRendered > 35 ? 42 : 35; 
        const nextDaysCount = totalGridCells - totalRendered;

        for (let nextDay = 1; nextDay <= nextDaysCount; nextDay++) {
            days.push(
                <div key={`next-${nextDay}`} className="calendar-day other-month">
                    {nextDay}
                </div>
            );
        }

        return days;
    };

    const closeCalendar = (event) => {
        event.stopPropagation();
        onClose(newDate);
    }

    return (
        <div className="calendar-overlay">
            <div className="calendar">
                <div className="calendar-header">
                    <h3 className="calendar-title">Choose Date</h3>
                    <div className="calendar-choose-month">
                        <svg onClick={decreaseMonth} className="calendar-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="calendar-date">{mounths[newDate.getMonth()]} {newDate.getFullYear()}</p>
                        <svg onClick={increaseMonth} className="calendar-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>

                    <div className="calendar-close">
                        <svg onClick={(event) => closeCalendar(event)} className="calendar-close-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
                
                <div className="calendar-body">
                    <div className="calendar-weekdays">
                        {   
                            weekdays.map((day) => {
                                return <div className="weekday" key={day}>{day}</div>
                            })     
                        }
                    </div>
                    <div className="calendar-days">
                        {renderCalendarDays()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar