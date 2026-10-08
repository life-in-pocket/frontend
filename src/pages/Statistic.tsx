import React, {useState, useEffect, useRef} from "react"
import WeekPicker from "../components/DatePicker/WeekPicker";
import BlockStatistic from "../features/statisticBlocks/BlockStatistic";
import { getStatistic } from "../api/tasks";
import { fillWeek } from "../utils/fillWeek";
import { StatisticBlock } from "../types/block";
import Sidebar from "../features/sidebar/Sidebar";
import "./Statistic.css"


function formatDate(date: Date) : string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');        
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function Statistic() {
    const [statisticBlocks, setStatisticBlocks] = useState<StatisticBlock[]>([]);
    const [firstDate, setFirstDate] = useState<string | null>(null);
    const [lastDate, setLastDate] = useState<string | null>(null);
    const firstDateRef = useRef<string | null>(null);
    const lastDateRef = useRef<string | null>(null);

    useEffect(() => {
        if (firstDate === null || lastDate === null) return;
        let cancelled = false;
        getStatistic(firstDate, lastDate).then((statistic) => {
            if (!cancelled) setStatisticBlocks(statistic);
        });
        return () => { cancelled = true; };
    }, [firstDate, lastDate]);

    
    const handleDateChange = (FirstDate: Date, LastDate: Date) => {
        let newFirstDate = formatDate(FirstDate);
        let newLastDate = formatDate(LastDate);
        firstDateRef.current = newFirstDate;
        lastDateRef.current = newLastDate;
        setFirstDate(newFirstDate);
        setLastDate(newLastDate);
    }

    return (
        <div className="app">
            <Sidebar />
            <div className="statistic">
                <div className="statistic-header">
                    <WeekPicker onSave={handleDateChange} />
                </div>
                {statisticBlocks.length === 0 && <p className="statistic-empty">No statistics available for the selected week.</p>}
                <div className="statistic-content">
                    {statisticBlocks.length > 0 && (
                        statisticBlocks.map((block) => (
                            <BlockStatistic key={block.title} title={block.title} data={fillWeek(block.records, firstDateRef.current as string, lastDateRef.current as string)} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Statistic