
import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DataPoint {
  name: string;
  [key: string]: string | number;
}

interface BarChartProps {
  data: DataPoint[];
  bars: {
    dataKey: string;
    name: string;
    color: string;
  }[];
  height?: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  layout?: "vertical" | "horizontal";
  barSize?: number;
}

export function BarChart({
  data,
  bars,
  height = 300,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  layout = "horizontal",
  barSize = 20,
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart
        data={data}
        layout={layout}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        barSize={barSize}
        barGap={4}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />}
        
        {showXAxis && <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: '#888' }}
          type={layout === "horizontal" ? "category" : "number"}
        />}
        
        {showYAxis && <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: '#888' }}
          type={layout === "horizontal" ? "number" : "category"}
        />}
        
        {showTooltip && <Tooltip />}
        
        {showLegend && <Legend verticalAlign="top" height={36} />}
        
        {bars.map((bar) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            name={bar.name}
            fill={bar.color}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
