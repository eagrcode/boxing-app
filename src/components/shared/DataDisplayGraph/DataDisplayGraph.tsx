"use client";

import styles from "./DataDisplayGraph.module.scss";

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export default function DataDisplayGraph({
  completedWorkouts,
}: {
  completedWorkouts: Promise<any[]>;
}) {
  return <div className={styles.dataDisplayGraph}></div>;
}
