import {useState, useEffect, useRef} from "react";
import CreateBlock from "../features/blocks/CreateBlock";
import "../assets/css/components/Modal.css";
import DataPicker from "../element/DataPicker";
import { getTasks, createTask, deleteTask } from "../api/tasks";
import Block from "../features/blocks/Block";

export interface Task {
  id: number;
  taskId: number;
  date: string;
  isActive: boolean;
  time: number;
  target: number;
  description: string | null;
  title: string;
}

interface RawTaskResponse {
  id: number;
  task_id: number;
  date: string;
  is_active: boolean;
  time: number;
  target: number;
  description: string | null;
  task: {
    title: string;
  };
}

function mapBlock(raw: RawTaskResponse): Task {
    return {
        id: raw.id,
        taskId: raw.task_id,
        date: raw.date,
        isActive: raw.is_active,
        time: raw.time,
        target: raw.target,
        description: raw.description,
        title: raw.task?.title ?? "",
    };
}

function formatDate(date : Date) : string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');        
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function Modal() {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [blocks, setBlocks] = useState<Task[]>([]);
    const [newBlockTitle, setNewBlockTitle] = useState<string>("New Block");
    const [newBlockTime, setNewBlockTime] = useState<number>(0);
    const [newBlockTarget, setNewBlockTarget] = useState<number>(0);
    const [selectedDate, setSelectedDate] = useState<string>(() => formatDate(new Date()));
    const selectedDateRef = useRef<string>(selectedDate);

    useEffect(() => {
        let cancelled = false;

        getTasks(selectedDate).then((rawTasks: RawTaskResponse[]) => {
        if (!cancelled) {
            setBlocks(rawTasks.map(mapBlock));
        }
        });

        return () => {
        cancelled = true;
        };
    }, [selectedDate]);

    const handleDateChange = (date: Date) => {
        const formattedDate = formatDate(date);
        setSelectedDate(formattedDate);
        selectedDateRef.current = formattedDate;
    }

    const editDashboard = () => {
        setIsEditing((prev) => !prev);
    };

    const handleSaveMethod = (updatedBlock: { title: string; time: number; target: number }) => {
        setNewBlockTitle(updatedBlock.title);
        setNewBlockTime(updatedBlock.time);
        setNewBlockTarget(updatedBlock.target);
        createNewBlock();
    }

    const createNewBlock = () => {
        const requestDate = selectedDate;
        const payload = {
            title: newBlockTitle.trim(),
            time: newBlockTime || 0,
            target: newBlockTarget || 1,
            date: requestDate 
        };

        createTask(payload)
            .then((rawTask: RawTaskResponse) => {
                if (selectedDateRef.current !== requestDate) return;
                setBlocks(prevBlocks => [...prevBlocks, mapBlock(rawTask)]);
            })
            .catch(error => {
                console.error("Failed to create block:", error);
            });
    };

    const deleteBlock = (id: number) => {
        deleteTask(id).then(() => {
            setBlocks(blocks.filter(block => block.id !== id));
        });
    };

    return (
        <div className="modal">
            <div className="modal-header">
                <DataPicker onSave={handleDateChange} />
                <div className="modal-edit" onClick={editDashboard}>
                    <svg className="modal-edit-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 20H21M16.5 3.5C16.8978 3.10218 17.4374 2.87868 18 2.87868C18.5626 2.87868 19.1022 3.10218 19.5 3.5C19.8978 3.89782 20.1213 4.43742 20.1213 5C20.1213 5.56258 19.8978 6.10218 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
            <div className="modal-content">
                {blocks.map(block => (
                    <Block 
                    block={block} 
                    key={block.id} 
                    deleteBlock={() => deleteBlock(block.id)} 
                    isEditing={isEditing} 
                    />
                ))}
                <CreateBlock
                onSave={(title, time, target) => handleSaveMethod({ title, time, target })} 
                title={newBlockTitle} 
                time={newBlockTime} 
                target={newBlockTarget} 
                isEditing={isEditing}
                />     
            </div>
        </div>
    )
}

export default Modal
