import React, {useState, useEffect, useRef} from "react"
import "../assets/css/components/Statistic.css"
import DataPicker from "../element/DataPicker";
import BlockStatistic from "../features/statistic/BlockStatistic";

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');        
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function Statistic() {
    const [statisticBlocks, setStatisticBlocks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
    const selectedDateRef = useRef(selectedDate);
    
    const handleDateChange = (date) => {
        const nextDate = formatDate(date);
        selectedDateRef.current = nextDate;
        setSelectedDate(nextDate);
    }
    return (
        <div className="statistic">
            <div className="statistic-header">
                <DataPicker onSave={handleDateChange} />
            </div>
            <div className="statistic-content">
                <BlockStatistic title="Block Statistics 1" data={statisticBlocks[0]} />
                <BlockStatistic title="Block Statistics 2" data={statisticBlocks[1]} />
                <BlockStatistic title="Block Statistics 3" data={statisticBlocks[2]} />
                <BlockStatistic title="Block Statistics 4" data={statisticBlocks[3]} />
                <BlockStatistic title="Block Statistics 5" data={statisticBlocks[4]} />
            </div>
        </div>
    )
}

export default Statistic