import { useState, useEffect, useRef } from "react";
import CreateBlock from "../features/blocks/CreateBlock";
import DatePicker from "../components/DatePicker/DatePicker";
import Block from "../features/blocks/Block";
import { getTasks, createTask, deleteTask } from "../api/tasks";
import type { Task } from "../types/block";
import Sidebar from "../features/sidebar/Sidebar";
import BurgerButton from "../components/BurgerButton/BurgerButton";

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
    const [tasksVersion, setTasksVersion] = useState(0);

    const refreshTasks = () => setTasksVersion((v) => v + 1);

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
    }, [selectedDate, tasksVersion]);

    const handleDateChange = (date: Date) => {
        const formatted = formatDate(date);
        selectedDateRef.current = formatted;
        setSelectedDate(formatted);
    };

    const createNewBlock = (title: string, time: number, target: number) => {
        createTask({ title: title.trim(), time, target, date: selectedDate })
            .then(() => refreshTasks())
            .catch((error) => {
                if (error.status === 409) {
                    alert("A block with this title already exists for the selected date.");
                }
                console.error("Failed to create block:", error);
            });
    };

    const deleteBlock = (id: number) => {
        deleteTask(id)
            .then(() => refreshTasks())
            .catch((error) => console.error("Failed to delete block:", error));
    };

    const handleTaskToggled = (taskId: number, isActive: boolean) => {
    setBlocks((prev) =>
        prev.map((block) =>
            block.id === taskId ? { ...block, isActive } : block
        )
        );
    };


        return (
            <div className="grid grid-cols-[18rem_1fr] min-h-screen">
                <Sidebar />
                <main className="grid grid-cols-1 grid-rows-[9rem_1fr] min-h-screen">
                    <header className="relative flex justify-center items-center text-[1.2rem] font-semibold pl-18">
                        <DatePicker onSave={handleDateChange} />
                        <BurgerButton
                            className="absolute top-4 left-4"
                            date={selectedDate}
                            refreshKey={tasksVersion}
                            onTaskToggled={refreshTasks}
                        />                
                        <button
                            type="button"
                            onClick={() => setIsEditing((prev) => !prev)}
                            className={`absolute top-2 right-2 p-2 rounded-lg transition-colors cursor-pointer hover:text-blue-600 ${
                                isEditing 
                                    ? "text-gray-500" 
                                    : "text-gray-100 "
                            }`}
                            aria-label="Edit block"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
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

                    <section className="px-15 grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-6 auto-rows-55 items-start">
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