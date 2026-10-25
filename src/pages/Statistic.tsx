import WeekPicker from "../components/DatePicker/WeekPicker";
import BlockStatistic from "../features/statisticBlocks/BlockStatistic";
import TypeOfDatePicker, { PickerType } from "../components/TypeOfDatePicker/TypeOfDatePicker";
import Sidebar from "../features/sidebar/Sidebar";
import {useState, useEffect, useRef} from "react"
import { getStatistic, getCircleChart } from "../api/tasks";
import { fillWeek } from "../utils/fillWeek";
import { StatisticBlock, CircleBlock } from "../types/block";
import CircleChart from "../features/statisticBlocks/CircleChart";


function formatDate(date: Date) : string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');        
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function Statistic() {
    const [statisticBlocks, setStatisticBlocks] = useState<StatisticBlock[]>([]);
    const [statisticCircleChart, setStatisticCircleChart] = useState<CircleBlock[]>([]);
    const [firstDate, setFirstDate] = useState<string | null>(null);
    const [lastDate, setLastDate] = useState<string | null>(null);
    const firstDateRef = useRef<string | null>(null);
    const lastDateRef = useRef<string | null>(null);

    const [pickerType, setPickerType] = useState<PickerType>("week");

    useEffect(() => {
        if (firstDate === null || lastDate === null) return;

        let cancelled = false;

        getStatistic(firstDate, lastDate)
            .then((statistic) => {
            if (!cancelled) setStatisticBlocks(statistic);
            })
            .catch((err) => console.error("getStatistic failed", err));

        getCircleChart(firstDate, lastDate)
            .then((statistic) => {
            if (!cancelled) setStatisticCircleChart(statistic);
            })
            .catch((err) => console.error("getCircleChart failed", err));

        return () => {
            cancelled = true;
        };
    }, [firstDate, lastDate, pickerType]);

    
    const handleDateChange = (FirstDate: Date, LastDate: Date) => {
        let newFirstDate = formatDate(FirstDate);
        let newLastDate = formatDate(LastDate);
        firstDateRef.current = newFirstDate;
        lastDateRef.current = newLastDate;
        setFirstDate(newFirstDate);
        setLastDate(newLastDate);
    }

    return (
        <div className="grid grid-cols-[18rem_1fr] min-h-screen">
            <Sidebar />
            <main className="relative grid grid-cols-1 grid-rows-[12rem_1fr]">
                <header className="flex flex-col justify-center items-center gap-8 mt-4 text-xl font-semibold">
                    <TypeOfDatePicker value={pickerType} onChange={setPickerType}/>
                    <WeekPicker type={pickerType} onSave={handleDateChange} />
                </header>
                {statisticBlocks.length === 0 && <p className="text-center text-xl font-semibold italic">No statistics available for the selected date.</p>}
                <div className="grid grid-cols-2 gap-4">
                    {statisticBlocks.length > 0 && (
                        statisticBlocks.map((block) => (
                            <BlockStatistic key={block.title} title={block.title} data={fillWeek(block.records, firstDateRef.current as string, lastDateRef.current as string)} />
                        ))
                    )}
                </div>
                <div className="mx-auto my-0">
                    {statisticBlocks.length != 0 && <CircleChart isAnimationActive={true} data={statisticCircleChart}/>}                
                </div>
            </main>
        </div>
    )
}

export default Statistic