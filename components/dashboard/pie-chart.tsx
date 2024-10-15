"use client";

import { LabelList, Pie, PieChart } from "recharts";
import AnalyticsCard from "./analytics-card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const getRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, "0")}`;
};
export function PieGraph({ data }) {
  const locationCount = data.reduce((acc, item) => {
    acc[item.location] = (acc[item.location] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(locationCount).map(([location, count]) => ({
    location,
    visitors: count,
    fill: getRandomColor(),
  }));

  // Step 3: Update your chart config as needed
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    // Add other configurations if needed
  } satisfies ChartConfig;

  return (
    <AnalyticsCard
      title="Traffic Pie Chart"
      subTitle="Showing Visitors from different locations"
    >
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[350px]"
      >
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent nameKey="visitors" hideLabel />}
          />
          <Pie data={chartData} dataKey="visitors">
            <LabelList
              dataKey="location"
              className="fill-background"
              stroke="none"
              fontSize={12}
              formatter={(value) => value}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </AnalyticsCard>
  );
}
