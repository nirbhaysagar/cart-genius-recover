
import React from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

interface DataPoint {
  name: string;
  [key: string]: string | number;
}

interface LineAreaChartProps {
  data: DataPoint[];
  areas: {
    dataKey: string;
    name: string;
    color: string;
    strokeWidth?: number;
  }[];
  height?: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  className?: string; // Added className prop
}

export function LineAreaChart({
  data,
  areas,
  height = 300,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  className, // Added className prop
}: LineAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height} className={className}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />}
        
        {showXAxis && <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#888' }} />}
        
        {showYAxis && <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#888' }} />}
        
        {showTooltip && <Tooltip />}
        
        {showLegend && <Legend verticalAlign="top" height={36} />}
        
        {areas.map((area) => (
          <Area
            key={area.dataKey}
            type="monotone"
            dataKey={area.dataKey}
            name={area.name}
            stroke={area.color}
            strokeWidth={area.strokeWidth || 2}
            fill={area.color}
            fillOpacity={0.1}
            activeDot={{ r: 6 }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
