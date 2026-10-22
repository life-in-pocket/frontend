import { useState, useEffect, useMemo } from "react";
import Calendar from "./Calendar";
import { PickerType } from "../TypeOfDatePicker/TypeOfDatePicker";

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getBounds(type: PickerType, date: Date): [Date, Date] {
  switch (type) {
    case "week": {
      const day = (date.getDay() + 6) % 7; // Понеділок як перший день
      const start = new Date(date.getFullYear(), date.getMonth(), date.getDate() - day);
      const end = new Date(date.getFullYear(), date.getMonth(), date.getDate() - day + 6);
      return [start, end];
    }
    case "month": {
      const start = new Date(date.getFullYear(), date.getMonth(), 1);
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      return [start, end];
    }
    case "year": {
      const start = new Date(date.getFullYear(), 0, 1);
      const end = new Date(date.getFullYear(), 11, 31);
      return [start, end];
    }
  }
}

function formatPeriodLabel(type: PickerType, start: Date, end: Date): string {
  switch (type) {
    case "week":
      return `${formatDate(start)} — ${formatDate(end)}`;
    case "month":
      return start.toLocaleDateString("uk-UA", { month: "long", year: "numeric" });
    case "year":
      return `${start.getFullYear()}`;
  }
}

interface DateRangePickerProps {
  type: PickerType;
  onSave: (startDate: Date, endDate: Date) => void;
}

export default function DateRangePicker({ type, onSave }: DateRangePickerProps) {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const [startDate, endDate] = useMemo(
    () => getBounds(type, currentDate),
    [type, currentDate]
  );

  const dateToShow = useMemo(
    () => formatPeriodLabel(type, startDate, endDate),
    [type, startDate, endDate]
  );

  useEffect(() => {
    onSave(startDate, endDate);
  }, [startDate, endDate, onSave]);

  const shiftPeriod = (direction: -1 | 1) => {
    setCurrentDate((prev) => {
      const next = new Date(prev);
      switch (type) {
        case "week":
          next.setDate(next.getDate() + direction * 7);
          break;
        case "month":
          next.setMonth(next.getMonth() + direction);
          break;
        case "year":
          next.setFullYear(next.getFullYear() + direction);
          break;
      }
      return next;
    });
  };

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
    setIsCalendarOpen(false);
  };

  return (
    <>
      <div className="time-picker">
        <svg
          onClick={() => shiftPeriod(-1)}
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
        <span onClick={() => setIsCalendarOpen((prev) => !prev)} className="time-picker-clock">
          {dateToShow}
        </span>
        <svg
          onClick={() => shiftPeriod(1)}
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

