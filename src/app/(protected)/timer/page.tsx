"use client";

import styles from "./page.module.scss";
import { useState } from "react";
import Timer from "@/src/components/timers/Timer/Timer";
import InitiateTimerForm from "@/src/components/forms/InitiateTimerForm/InitiateTimerForm";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { BsFillVolumeMuteFill } from "react-icons/bs";
import { useTimerDataContext } from "@/src/context/TimerData.context";
import { MdInfoOutline, MdOutlineClose } from "react-icons/md";

export default function TimerPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    timer_mode?: string;
  };
}) {
  const [randomCombo, setRandomCombo] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const timerMode = searchParams?.timer_mode || "";

  // Show timer view
  if (timerMode === "active") {
    return (
      <div className={styles.timerWrapper}>
        <Timer sequence={randomCombo} setRandomCombo={setRandomCombo} isMuted={isMuted} />
        <div onClick={() => setIsMuted((prev) => !prev)} className={styles.muteBtn}>
          {isMuted ? <BsFillVolumeMuteFill size={25} /> : <BsFillVolumeUpFill size={25} />}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div onClick={() => setShowInfo((prev) => !prev)} className={styles.infoIcon}>
        {!showInfo ? <MdInfoOutline size={30} /> : <MdOutlineClose size={30} />}
      </div>
      <InitiateTimerForm
        setShowInfo={setShowInfo}
        randomCombo={randomCombo}
        setRandomCombo={setRandomCombo}
      />
      {showInfo && (
        <div className={styles.infoWrapper}>
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
        </div>
      )}
    </div>
  );

  // return (
  //   <div className={styles.wrapper}>
  //
  //     {isModeView && <ModeView handleViewChange={handleViewChange} />}
  //     {isComboView && (
  //       <ComboView
  //         randomCombo={randomCombo}
  //         setRandomCombo={setRandomCombo}
  //         handleViewChange={handleViewChange}
  //       />
  //     )}
  //     {isFormView && <InitiateTimerForm setIsTimerActive={setIsTimerActive} />}
  //   </div>
  // );
}
