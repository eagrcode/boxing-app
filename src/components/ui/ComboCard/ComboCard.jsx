// styles
import styles from "./ComboCard.module.scss";

// react
import React from "react";

const ComboCard = ({ id, sequence }) => {
  return (
    <>
      <ul className={styles.ul}>
        {sequence?.map((punch, index) => (
          <React.Fragment key={index}>
            <li className={styles.punchTag}>{punch}</li>
            <div className={styles.arrow}>{">"}</div>
          </React.Fragment>
        ))}
      </ul>
      {/* <p>{difficulty}</p> */}
    </>
  );
};

export default ComboCard;
