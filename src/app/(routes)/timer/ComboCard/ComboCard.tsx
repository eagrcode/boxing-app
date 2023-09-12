// styles
import styles from "./ComboCard.module.scss";

// react
import React from "react";

// icons
import { HiArrowSmRight } from "react-icons/hi";

interface ComboCardProps {
  sequence: string[];
}

const ComboCard = ({ sequence }: ComboCardProps) => {
  return (
    <>
      <ul className={styles.ul}>
        {sequence?.map((punch, index) => (
          <React.Fragment key={index}>
            <li className={styles.punchTag}>{punch}</li>
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
