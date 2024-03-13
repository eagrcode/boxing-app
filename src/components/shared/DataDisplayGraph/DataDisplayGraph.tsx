"use client";

import { Line } from "react-chartjs-2";
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
  Filler,
} from "chart.js";
import styles from "./DataDisplayGraph.module.scss";
import FilterBtns from "./FilterBtns/FilterBtns";
import formatSixMonthsData from "./formatSixMonthsData";
import formatThirtyDaysData from "./formatThirtyDaysData";
import formatSevenDaysData from "./formatSevenDaysData";

type TimeSeriesData = {
  date: string;
  entry_count: number;
};

type FilterButtonTypes = {
  filter: string;
  arrLength: number;
  text: string;
  isActive: boolean;
};

type GraphTypes = {
  timeSeriesData: TimeSeriesData[];
  filterButtons: FilterButtonTypes[];
  activeTileParam: string;
  activeFilterParam: string;
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
      min: 0,
      ticks: {
        color: "white",
        stepSize: 5,
      },
      border: {
        display: true,
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        drawTicks: true,
        color: "hsla(0, 0%, 80%, 0.1)",
      },
    },
    x: {
      ticks: {
        color: "white",
      },
      border: {
        display: true,
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        drawTicks: true,
      },
    },
  },
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

export default function DataDisplayGraph({
  timeSeriesData,
  filterButtons,
  activeTileParam,
  activeFilterParam,
}: GraphTypes) {
  console.log(timeSeriesData);

  let formattedLabels: string[] = [];
  let formattedData: number[] = [];

  switch (activeFilterParam) {
    case "_6_months":
      ({ formattedLabels, formattedData } = formatSixMonthsData(timeSeriesData));
      break;
    case "_1_month":
      ({ formattedLabels, formattedData } = formatThirtyDaysData(timeSeriesData));
      break;
    case "_7_days":
      ({ formattedLabels, formattedData } = formatSevenDaysData(timeSeriesData));
      break;
    default:
      ({ formattedLabels, formattedData } = formatSixMonthsData(timeSeriesData));
      break;
  }

  const data = {
    labels: formattedLabels,
    datasets: [
      {
        fill: true,
        data: formattedData,
        backgroundColor: "hsl(220, 100%, 60%)",
        borderColor: "#3377ff50",
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
        return "Bag Time";
      case "get_average_workout":
        return "Avg Workout";
      default:
        return "Workouts";
    }
  }

  return (
    <div className={styles.graphContainer}>
      <div className={styles.topContainer}>
        <h1 className={styles.title}>{formatTitle(activeTileParam)}</h1>
        <div className={styles.filterContainer}>
          {filterButtons.map((btn, index) => (
            <FilterBtns
              key={index}
              filter={btn.filter}
              isActive={btn.isActive}
              text={btn.text}
              activeTileParam={activeTileParam}
            />
          ))}
        </div>
      </div>
      <Line className={styles.graph} options={options} data={data} />
    </div>
  );
}
