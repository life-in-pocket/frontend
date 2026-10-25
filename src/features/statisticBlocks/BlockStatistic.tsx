import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { useState } from 'react';
  
interface BlockStatisticProps {
  title?: string;
  data: { date: string; time: number }[];
}

function BlockStatistic({ title = 'New Block Statistics', data }: BlockStatisticProps) {

  return (
    <div>
      <h2 className="text-center text-[2rem] font-semibold">{title}</h2>
      <BarChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
          <CartesianGrid stroke="#94a3b8" strokeDasharray="5 5" strokeOpacity={0.5} />
          <XAxis dataKey="date" stroke="#e11d48" />
          <YAxis stroke="#e11d48" strokeWidth={2} />
          <Tooltip />
          <Bar
              dataKey="time"
              fill="#0ea5e9"
              fillOpacity={0.85}
              stroke="#0369a1"
              strokeWidth={2}
              radius={4}
              barSize={30}
          />
      </BarChart>
    </div>
  )
}

export default BlockStatistic