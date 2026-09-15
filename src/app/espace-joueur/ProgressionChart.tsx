"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProgressionChart({ data }: { data: any[] }) {
  if (!data || data.length === 0) return <div className="text-zinc-500 italic">Pas de données de progression disponibles.</div>;

  // Format data for recharts
  const chartData = data.map(item => ({
    name: `${item.saison} P${item.phase}`,
    points: item.points
  })).reverse(); // Reverse to have chronological order

  return (
    <div className="w-full h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="points" stroke="#1873D3" strokeWidth={3} dot={{ r: 5, fill: "#1873D3" }} activeDot={{ r: 8 }} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} />
          <YAxis domain={['dataMin - 50', 'dataMax + 50']} tick={{ fontSize: 12, fill: '#666' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '2px solid #000', fontWeight: 'bold' }}
            itemStyle={{ color: '#000' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
