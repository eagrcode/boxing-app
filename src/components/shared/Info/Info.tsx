"use client";

import styles from "./Info.module.scss";
import { motion } from "framer-motion";

export default function Info() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className={styles.infoWrapper}
    >
      <h2 className={styles.modeHeading}>Interval - ACG</h2>

      <p>Standard interval timer with Beatdown automatic combo generation.</p>

      <p>Each rest round will automatically generate a new combo of your chosen difficulty.</p>
      <ol>
        <li>Select combination difficulty</li>
        <li>Generate initial combination</li>
        <li>Define round settings</li>
      </ol>

      <h2 className={styles.modeHeading}>Interval - Standard</h2>

      <p>Standard interval timer, structure your exercises as you choose.</p>

      <p>Each rest round will automatically generate a new combo of your chosen difficulty.</p>
      <ol>
        <li>Select combination difficulty</li>
        <li>Generate initial combination</li>
        <li>Define round settings</li>
      </ol>
    </motion.div>
  );
}
