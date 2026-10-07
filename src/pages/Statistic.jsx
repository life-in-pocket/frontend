import React, {useState, useEffect, useRef} from "react"
import "./Statistic.css"
import WeekPicker from "../components/DatePicker/WeekPicker";
import BlockStatistic from "../features/statisticBlocks/BlockStatistic";
import { getStatistic } from "../api/tasks";
import { fillWeek } from "../utils/fillWeek";

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');        
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function Statistic() {
    const [statisticBlocks, setStatisticBlocks] = useState([]);
    const [firstDate, setFirstDate] = useState(null);
    const [lastDate, setLastDate] = useState(null);
    const firstDateRef = useRef(firstDate);
    const lastDateRef = useRef(lastDate);

    useEffect(() => {
        if (firstDate === null || lastDate === null) return;
        let cancelled = false;
        getStatistic(firstDate, lastDate).then((statistic) => {
            if (!cancelled) setStatisticBlocks(statistic);
        });
        return () => { cancelled = true; };
    }, [firstDate, lastDate]);

    
    const handleDateChange = (newFirstDate, newLastDate) => {
        newFirstDate = formatDate(newFirstDate);
        newLastDate = formatDate(newLastDate);
        firstDateRef.current = newFirstDate;
        lastDateRef.current = newLastDate;
        setFirstDate(newFirstDate);
        setLastDate(newLastDate);
    }

    return (
        <div className="statistic">
            <div className="statistic-header">
                <WeekPicker onSave={handleDateChange} />
            </div>
            {statisticBlocks.length === 0 && <p className="statistic-empty">No statistics available for the selected week.</p>}
            <div className="statistic-content">
                {statisticBlocks.length > 0 && (
                    statisticBlocks.map((block) => (
                        <BlockStatistic key={block.title} title={block.title} data={fillWeek(block.records, firstDate, lastDate)} />
                    ))
                )}
            </div>
        </div>
    )
}

export default Statistic