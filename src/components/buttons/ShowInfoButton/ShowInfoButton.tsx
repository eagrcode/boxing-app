"use client";

import { useState } from "react";
import styles from "./ShowInfoButton.module.scss";
import { MdInfoOutline, MdOutlineClose } from "react-icons/md";
import Info from "../../shared/Info/Info";

export default function ShowInfoButton() {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  return (
    <>
      <button
        type="button"
        aria-label="Show information"
        onClick={() => setShowInfo((prev) => !prev)}
        className={styles.infoIcon}
      >
        {!showInfo ? <MdInfoOutline size={30} /> : <MdOutlineClose size={30} />}
      </button>
      {showInfo && <Info />}
    </>
  );
}
