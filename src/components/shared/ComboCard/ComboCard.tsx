"use client";

// styles
import styles from "./ComboCard.module.scss";

// react
import React from "react";

// icons
import { HiArrowSmRight } from "react-icons/hi";

import { useTimerDataContext } from "@/src/context/TimerData.context";

interface ComboCardProps {
  sequence: string[];
}

const ComboCard = ({ sequence }: ComboCardProps) => {
  const { isTimerActive } = useTimerDataContext();

  return (
    <>
      <ul className={styles.ul}>
        {sequence?.map((punch, index) => (
          <React.Fragment key={index}>
            <li className={`${styles.punchTag} ${isTimerActive && styles.active}`}>{punch}</li>
            <div className={styles.arrow}>
              <HiArrowSmRight />
            </div>
          </React.Fragment>
        ))}
      </ul>
      {/* <p>{difficulty}</p> */}
    </>
  );
};

export default ComboCard;
