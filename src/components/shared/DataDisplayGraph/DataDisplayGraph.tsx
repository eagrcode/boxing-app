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
  currentQuery: string;
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      ticks: {
        color: "white",
        stepSize: 10,
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
      display: false,
    },
    title: {
      display: false,
    },
  },
};

export default function DataDisplayGraph({ sixMonthsCompletedWorkouts, currentQuery }: GraphTypes) {
  const data = {
    labels: sixMonthsCompletedWorkouts.map((entry) => formatGraphLabels(entry.month)),
    datasets: [
      {
        data: sixMonthsCompletedWorkouts.map((entry) => entry.entry_count),
        backgroundColor: "#0b84da",
        borderColor: "#0b84da99",
      },
    ],
  };

  function formatTitle(currentQuery: string) {
    switch (currentQuery) {
      case "get_completed_workouts":
        return "Workouts";
      case "get_completed_rounds":
        return "Rounds";
      case "get_completed_time":
        return "Minutes";
      default:
        return "Workouts";
    }
  }

  return (
    <div className={styles.graphContainer}>
      <h1 className={styles.title}>{formatTitle(currentQuery)}</h1>
      <Line options={options} data={data} />
    </div>
  );
}
