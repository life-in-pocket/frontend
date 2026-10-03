import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { useState } from 'react';
import '../../assets/css/features/statistic/BlockStatistic.css';



function BlockStatistic({ title = 'New Block Statistics', data }) {
  const [dataBlock, setDataBlock] = useState([
    { month: 'Jan', revenue: 4200 },
    { month: 'Feb', revenue: 5800 },
    { month: 'Mar', revenue: 7200 },
    { month: 'Apr', revenue: 6100 },
    { month: 'May', revenue: 8900 },
    { month: 'Jun', revenue: 7400 },
  ] || data);
  
  return (
    <div className="statistic-block">
      <h2 className="statistic-block__title">{title}</h2>
      <BarChart
        style={{ width: '100%', maxWidth: 600, maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={dataBlock}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid stroke="#94a3b8" strokeDasharray="5 5" strokeOpacity={0.5} />
            <XAxis dataKey="month" stroke="#e11d48" />
            <YAxis stroke="#e11d48" strokeWidth={2} />
            <Tooltip defaultIndex={2} />
            <Bar
              dataKey="revenue"
              fill="#0ea5e9"
              fillOpacity={0.85}
              stroke="#0369a1"
              strokeWidth={2}
              radius={4}
              barSize={30}
            />
            <RechartsDevtools />
          </BarChart>
        </div>
    )
}

export default BlockStatistic