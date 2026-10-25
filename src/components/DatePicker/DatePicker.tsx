import { useState } from "react";
import Calendar from "./Calendar";

function DatePicker({ onSave }: { onSave: (date: Date) => void }) {

    const [datetime, setDatetime] = useState<Date>(new Date());
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

    const toggleCalendar = () => {
        onSave(datetime);
        setIsCalendarOpen(prev => !prev);
    }

    const handleDateChange = (date: Date) => {
        setDatetime(date);
        onSave(date);
        setIsCalendarOpen(false);
    }

    const dateBefore = () => {
        const newDate = new Date(datetime);
        newDate.setDate(newDate.getDate() - 1);
        setDatetime(newDate);
        onSave(newDate);
    }

    const dateAfter = () => {
        const newDate = new Date(datetime);
        newDate.setDate(newDate.getDate() + 1);
        setDatetime(newDate);
        onSave(newDate);
    }

    return (
        <>
            <div className="inline-flex justify-center items-center gap-1 p-2 rounded-3xl bg-second-accent">
                <svg onClick={dateBefore} className="cursor-pointer" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span onClick={toggleCalendar} className="cursor-pointer font-semibold">{datetime.toLocaleDateString()}</span>
                <svg onClick={dateAfter} className="cursor-pointer" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

            </div>

            {isCalendarOpen && <Calendar selectedDate={datetime} onClose={handleDateChange}/>}
        </>
    )
}

export default DatePicker