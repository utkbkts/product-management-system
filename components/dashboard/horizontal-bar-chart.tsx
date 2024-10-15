/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import AnalyticsCard from "./analytics-card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  // ... You can define other configurations if needed
} satisfies ChartConfig;

export function HorizontalGraph({ data }: any) {
  // Assuming 'data' is structured as an array of objects with 'location' and 'visitors'
  const chartData = data.map((item: any) => ({
    country: item.location,
    visitors: data.length, // Ensure you have the 'visitors' value
    fill: "#2563EB", // Default color if not provided
  }));

  return (
    <AnalyticsCard
      title="Traffic Bar Chart"
      subTitle="Showing Visitors from Different Countries"
    >
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square w-full max-h-[400px] mt-10"
      >
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            left: 0,
          }}
        >
          <YAxis
            dataKey="country"
            type="category"
            tickLine={false}
            tickMargin={0}
            axisLine={false}
            tickFormatter={(value) =>
              chartConfig[value as keyof typeof chartConfig]?.label || value
            }
          />
          <XAxis dataKey="visitors" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="visitors" radius={5} fill={chartData.fill} />
        </BarChart>
      </ChartContainer>
    </AnalyticsCard>
  );
}
