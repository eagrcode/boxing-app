"use client";

import { Line } from "react-chartjs-2";
import formatGraphLabels from "@/src/lib/utils/formatGraphLabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./DataDisplayGraph.module.scss";

type SixMonthsData = {
  month: string;
  entry_count: number;
};

type GraphTypes = {
  sixMonthsCompletedWorkouts: SixMonthsData[];
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      ticks: {
        color: "white",
        stepSize: 1,
      },
    },
    x: {
      ticks: {
        color: "white",
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Completed workouts",
    },
  },
};

export default function DataDisplayGraph({ sixMonthsCompletedWorkouts }: GraphTypes) {
  const data = {
    labels: sixMonthsCompletedWorkouts.map((entry) => formatGraphLabels(entry.month)),
    datasets: [
      {
        label: "Previous 6 months",
        data: sixMonthsCompletedWorkouts.map((entry) => entry.entry_count),
        backgroundColor: "#0b84da",
        borderColor: "#0b84da99",
      },
    ],
  };

  return (
    <div className={styles.graphContainer}>
      <Line options={options} data={data} />
    </div>
  );
}
