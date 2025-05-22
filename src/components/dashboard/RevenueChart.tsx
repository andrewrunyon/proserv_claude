import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 21500, expenses: 18200 },
  { name: 'Feb', revenue: 25300, expenses: 19100 },
  { name: 'Mar', revenue: 18900, expenses: 15800 },
  { name: 'Apr', revenue: 23700, expenses: 17600 },
  { name: 'May', revenue: 28900, expenses: 20300 },
  { name: 'Jun', revenue: 24800, expenses: 19700 },
  { name: 'Jul', revenue: 29500, expenses: 21200 },
  { name: 'Aug', revenue: 32100, expenses: 23500 },
  { name: 'Sep', revenue: 28450, expenses: 21800 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md bg-white p-3 shadow-lg ring-1 ring-gray-200">
        <p className="mb-1 font-medium">{label}</p>
        <p className="text-sm text-primary">
          Revenue: ${payload[0].value.toLocaleString()}
        </p>
        <p className="text-sm text-secondary">
          Expenses: ${payload[1].value.toLocaleString()}
        </p>
        <p className="mt-1 text-xs font-semibold text-gray-600">
          Profit: ${(payload[0].value - payload[1].value).toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
};

const RevenueChart: React.FC = () => {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis 
            tickFormatter={(value) => `$${value / 1000}k`}
            tick={{ fontSize: 12 }}
            width={50}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="revenue" name="Revenue" fill="hsl(220, 84%, 33%)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" name="Expenses" fill="hsl(171, 92%, 32%)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;