import { useState, useEffect } from "react";
import "./DatePicker.css";
import Calendar from "./Calendar";

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

interface WeekPickerProps {
  onSave: (startDate: Date, endDate: Date) => void;
}

function WeekPicker({ onSave }: WeekPickerProps) {
  const [firstDate, setFirstDate] = useState<Date>(new Date());
  const [lastDate, setLastDate] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const calculateWeekBounds = (targetDate: Date) => {
    const d = new Date(targetDate);
    const day = d.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;

    const monday = new Date(d);
    monday.setDate(d.getDate() + diffToMonday);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    setFirstDate(monday);
    setLastDate(sunday);
    onSave(monday, sunday);
  };

  useEffect(() => {
    calculateWeekBounds(currentDate);
  }, []);

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
    calculateWeekBounds(date);
    setIsCalendarOpen(false);
  };

  const shiftWeek = (daysOffset: number) => {
    const newFirstDate = new Date(firstDate);
    newFirstDate.setDate(newFirstDate.getDate() + daysOffset);

    const newLastDate = new Date(lastDate);
    newLastDate.setDate(newLastDate.getDate() + daysOffset);

    setFirstDate(newFirstDate);
    setLastDate(newLastDate);
    onSave(newFirstDate, newLastDate);
  };

  return (
    <>
      <div className="time-picker">
        <svg
          onClick={() => shiftWeek(-7)}
          className="time-picker-arrow"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span onClick={toggleCalendar} className="time-picker-clock">
          {formatDate(firstDate)} — {formatDate(lastDate)}
        </span>

        <svg
          onClick={() => shiftWeek(7)}
          className="time-picker-arrow"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 6L15 12L9 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {isCalendarOpen && (
        <Calendar
          selectedDate={currentDate}
          onClose={(date: Date) => handleDateChange(date)}
        />
      )}
    </>
  );
}

export default WeekPicker;