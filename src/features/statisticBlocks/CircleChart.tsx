import { Pie, PieChart, Tooltip } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

interface CircleCrartProps {
  isAnimationActive: boolean;
  data: {name: string, uv: number}[];
}

export default function CircleChart({ isAnimationActive = true, data}: CircleCrartProps) {
  return (
    <PieChart width={600} height={600}>
      <Pie
        activeShape={{
          fill: 'blue',
        }}
        data={data}
        dataKey="uv"
        isAnimationActive={isAnimationActive}
      />
      <Tooltip defaultIndex={2} />
      <RechartsDevtools />
    </PieChart>
  );
}