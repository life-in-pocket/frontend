import { useState, useEffect } from "react";
import { Task } from "../../types/block";
import { getAllTasks, updateTaskActive } from "../../api/tasks";

function BurgerButton({
    className,
    date,
    refreshKey,
    onTaskToggled,
}: {
    className?: string;
    date: string;
    refreshKey: number;
    onTaskToggled?: () => void;
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [tasks, setTasks] = useState<Task[] | null>(null);

    useEffect(() => {
        let cancelled = false;

        getAllTasks(date)
            .then((tasks) => {
                if (!cancelled) setTasks(tasks);
            })
            .catch((error) => {
                if (!cancelled) console.error("Failed to load tasks:", error);
            });

        return () => {
            cancelled = true;
        };
    }, [date, refreshKey]);

    const toggleTaskActive = (taskId: number) => {
        const task = tasks?.find((t) => t.id === taskId);
        if (!task) return;

        const newIsActive = !task.isActive;

        setTasks((prev) =>
            prev?.map((t) => (t.id === taskId ? { ...t, isActive: newIsActive } : t)) ?? null
        );

        updateTaskActive(taskId, newIsActive)
            .then(() => onTaskToggled?.())
            .catch((error) => {
                console.error("Failed to update task:", error);
                setTasks((prev) =>
                    prev?.map((t) => (t.id === taskId ? { ...t, isActive: task.isActive } : t)) ?? null
                );
            });
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className={`${className || ""} text-light flex flex-col gap-2`} onClick={toggleMenu}>
                <span className={`bg-light w-8 h-1 transition-rotate duration-300 ${isOpen ? "rotate-45 translate-y-5" : ""}`}></span>
                <span className={`bg-light w-8 h-1 ${isOpen ? "opacity-0" : ""}`}></span>
                <span className={`bg-light w-8 h-1 transition-rotate duration-300 ${isOpen ? "-rotate-45 -translate-y-1" : ""}`}></span>
            </button>

            {isOpen && (
                <div className={`absolute top-16 left-4 w-100 h-auto pb-30 bg-sidebar z-10 rounded-xl shadow-lg p-4 flex flex-col gap-4
                    ${tasks && tasks.length > 0 ? "p-0" : ""}
                `}>
                    {tasks ? (
                        tasks.map((task) => (
                            <div key={task.id} className="p-2 rounded-lg bg-background text-light flex justify-between items-center">
                                {task.title}

                                <button
                                    onClick={() => {toggleTaskActive(task.id)}}
                                    type="button"
                                    role="switch"
                                    aria-checked={task.isActive}
                                    className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--second-accent-color) ${
                                    task.isActive ? "bg-second-accent" : "bg-gray-500"
                                    }`}
                                >
                                    <span
                                    aria-hidden="true"
                                    className={`block size-6 rounded-full bg-white shadow transition-transform ${
                                        task.isActive ? "translate-x-6" : "translate-x-0"
                                    }`}
                                    />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-light text-center italic">No tasks available</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default BurgerButton;