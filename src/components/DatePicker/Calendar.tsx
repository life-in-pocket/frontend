import { useState } from "react";

interface CalendarProps {
    selectedDate: Date;
    onClose: (date: Date) => void;
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

function Calendar({ selectedDate, onClose }: CalendarProps) {
    const [viewDate, setViewDate] = useState(
        () => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
    );
    const [chosenDate, setChosenDate] = useState(selectedDate);

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const changeMonth = (delta: number) => {
        setViewDate(new Date(year, month + delta, 1));
    };

    const selectDay = (day: number) => {
        setChosenDate(new Date(year, month, day));
    };

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const cells: { key: string; day: number; current: boolean }[] = [];
    for (let i = startOffset - 1; i >= 0; i--) {
        cells.push({ key: `prev-${i}`, day: daysInPrevMonth - i, current: false });
    }
    for (let day = 1; day <= daysInMonth; day++) {
        cells.push({ key: `cur-${day}`, day, current: true });
    }
    const totalCells = cells.length > 35 ? 42 : 35;
    for (let day = 1; cells.length < totalCells; day++) {
        cells.push({ key: `next-${day}`, day, current: false });
    }

    const isChosen = (day: number) =>
        chosenDate.getFullYear() === year &&
        chosenDate.getMonth() === month &&
        chosenDate.getDate() === day;

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="calendar-title"
                className="relative w-auto rounded-2xl bg-sidebar p-8 shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
            >
                <button
                    type="button"
                    onClick={() => onClose(chosenDate)}
                    aria-label="Close"
                    className="absolute top-4 right-4 cursor-pointer hover:text-second-accent"
                >
                    <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18" />
                        <path d="M6 6L18 18" />
                    </svg>
                </button>

                <h2 id="calendar-title" className="mb-4 text-center text-4xl">
                    Choose Date
                </h2>

                <div className="mb-2 flex items-center justify-between px-5">
                    <button
                        type="button"
                        onClick={() => changeMonth(-1)}
                        aria-label="Previous month"
                        className="cursor-pointer hover:text-second-accent"
                    >
                        <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18L9 12L15 6" />
                        </svg>
                    </button>

                    <p aria-live="polite">
                        {MONTHS[month]} {year}
                    </p>

                    <button
                        type="button"
                        onClick={() => changeMonth(1)}
                        aria-label="Next month"
                        className="cursor-pointer hover:text-second-accent"
                    >
                        <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 6L15 12L9 18" />
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-7 text-center text-xl">
                    {WEEKDAYS.map((weekday) => (
                        <div key={weekday} className="py-1 font-semibold">
                            {weekday}
                        </div>
                    ))}

                    {cells.map((cell) =>
                        cell.current ? (
                            <button
                                key={cell.key}
                                type="button"
                                onClick={() => selectDay(cell.day)}
                                aria-pressed={isChosen(cell.day)}
                                className={`aspect-square cursor-pointer rounded-3xl hover:bg-second-accent/30 ${
                                    isChosen(cell.day) ? "bg-second-accent" : ""
                                }`}
                            >
                                {cell.day}
                            </button>
                        ) : (
                            <div key={cell.key} aria-hidden="true" className="aspect-square text-primary">
                                {cell.day}
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Calendar;