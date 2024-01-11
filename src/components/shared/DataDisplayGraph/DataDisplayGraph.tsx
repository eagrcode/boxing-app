"use client";

import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
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
  BarElement,
} from "chart.js";
import styles from "./DataDisplayGraph.module.scss";

type SixMonthsData = {
  month: string;
  entry_count: number;
};

type GraphTypes = {
  sixMonthsData: SixMonthsData[];
  currentQuery: string;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  scales: {
    y: {
      ticks: {
        color: "white",
        stepSize: 5,
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

export default function DataDisplayGraph({ sixMonthsData, currentQuery }: GraphTypes) {
  console.log(sixMonthsData);

  const data = {
    labels: sixMonthsData.map((entry) => formatGraphLabels(entry.month)),
    datasets: [
      {
        data: sixMonthsData.map((entry) => entry.entry_count),
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
      <Bar options={options} data={data} />
    </div>
  );
}
