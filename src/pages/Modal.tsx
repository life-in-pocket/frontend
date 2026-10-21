import { useState, useEffect, useRef } from "react";
import CreateBlock from "../features/blocks/CreateBlock";
import DatePicker from "../components/DatePicker/DatePicker";
import Block from "../features/blocks/Block";
import { getTasks, createTask, deleteTask } from "../api/tasks";
import type { Task } from "../types/block";
import Sidebar from "../features/sidebar/Sidebar";

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function Modal() {
    const [isEditing, setIsEditing] = useState(false);
    const [blocks, setBlocks] = useState<Task[]>([]);
    const [selectedDate, setSelectedDate] = useState(() => formatDate(new Date()));
    const selectedDateRef = useRef(selectedDate);

    useEffect(() => {
        let cancelled = false;

        getTasks(selectedDate)
            .then((tasks) => {
                if (!cancelled) setBlocks(tasks);
            })
            .catch((error) => {
                if (!cancelled) console.error("Failed to load blocks:", error);
            });

        return () => {
            cancelled = true;
        };
    }, [selectedDate]);

    const handleDateChange = (date: Date) => {
        const formatted = formatDate(date);
        selectedDateRef.current = formatted;
        setSelectedDate(formatted);
    };

    const createNewBlock = (title: string, time: number, target: number) => {
        const requestDate = selectedDate;

        createTask({ title: title.trim(), time, target, date: requestDate })
            .then((newBlock) => {
                if (selectedDateRef.current !== requestDate) return;
                setBlocks((prev) => [...prev, newBlock]);
            })
            .catch((error) => {
                console.error("Failed to create block:", error);
            });
    };

    const deleteBlock = (id: number) => {
        deleteTask(id)
            .then(() => setBlocks((prev) => prev.filter((block) => block.id !== id)))
            .catch((error) => console.error("Failed to delete block:", error));
    };

    return (
        <div className="min-h-screen">
            <Sidebar />
            <main className="grid grid-cols-1 grid-rows-[15rem_1fr] min-h-screen">
                <header className="relative flex justify-center items-center text-[1.8rem] font-semibold">
                    <DatePicker onSave={handleDateChange} />
                    <button
                        type="button"
                        onClick={() => setIsEditing((prev) => !prev)}
                        className={`absolute top-8 right-8 p-2 rounded-lg transition-colors cursor-pointer hover:text-blue-600 ${
                            isEditing 
                                ? "text-gray-500" 
                                : "text-gray-100 "
                        }`}
                        aria-label="Редагувати блоки"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                    </button>
                </header>

                <section className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max items-start">
                    {blocks.map((block) => (
                        <Block
                            key={block.id}
                            block={block}
                            deleteBlock={() => deleteBlock(block.id)}
                            isEditing={isEditing}
                        />
                    ))}
                    <CreateBlock onSave={createNewBlock} isEditing={isEditing} />
                </section>
            </main>
        </div>
    );
}

export default Modal;