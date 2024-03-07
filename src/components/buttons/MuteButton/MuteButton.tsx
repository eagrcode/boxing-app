"use client";

import React, { SetStateAction } from "react";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";
import styles from "./MuteButton.module.scss";

type PropTypes = {
  isMuted: boolean;
  setIsMuted: React.Dispatch<SetStateAction<boolean>>;
};

export default function MuteButton({ isMuted, setIsMuted }: PropTypes) {
  return (
    <div onClick={() => setIsMuted((prev) => !prev)} className={styles.muteBtn}>
      {isMuted ? <BsFillVolumeMuteFill size={25} /> : <BsFillVolumeUpFill size={25} />}
    </div>
  );
}
