"use client";

import styles from "./UserWorkout.module.scss";
import { useState } from "react";
import React from "react";
import { HiArrowSmRight } from "react-icons/hi";
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import { MdOutlineTimer } from "react-icons/md";
import { BsLightningCharge, BsHourglassTop } from "react-icons/bs";
import { useWorkoutTimerDataContext } from "@/src/context/WorkoutTimerData.context";
import formatTimeAgo from "@/src/lib/utils/formatTimeAgo";
import formatTimeDisplay from "@/src/lib/utils/formatTimeDisplay";
import DeleteModal from "./DeleteModal";
import SocialDataDisplay from "../../shared/SocialDataDisplay/SocialDataDisplay";
import addToHistory from "@/src/lib/services/addToHistory";
import incrementPlays from "@/src/lib/services/incrementPlays";
import WorkoutTimer from "@/src/components/timers/WorkoutTimer/WorkoutTimer";
import { usePathname } from "next/navigation";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { BsFillVolumeMuteFill } from "react-icons/bs";
import StartButton from "@/src/components/buttons/StartButton/StartButton";

interface UserWorkoutPropTypes {
  id: string;
  userID: string;
  title: string;
  description: string;
  roundInfo: { round: number; sequence: string[] }[];
  workoutRounds: number;
  workoutWarmupTime: number;
  workoutRoundTime: number;
  workoutRestTime: number;
  createdAt: string;
  createdBy: string;
  saved: boolean | null;
  likes: number;
  isLiked: boolean | null;
  plays: number;
  savesCount: number;
  name: string;
}

export default function UserWorkout({
  id,
  userID,
  title,
  description,
  roundInfo,
  workoutRounds,
  workoutWarmupTime,
  workoutRoundTime,
  workoutRestTime,
  createdAt,
  createdBy,
  saved,
  likes,
  isLiked,
  plays,
  savesCount,
  name,
}: UserWorkoutPropTypes) {
  // init state
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const path = usePathname();

  // destructure context
  const {
    setWorkoutRounds,
    setWorkoutRoundTime,
    setWorkoutRestTime,
    setWorkoutWarmupTime,
    setRoundInfo,
    setIsWorkoutMode,
    isWorkoutMode,
  } = useWorkoutTimerDataContext();

  // calc total workout time
  const totalTime = Math.floor(
    workoutWarmupTime + workoutRoundTime * workoutRounds + workoutRestTime * (workoutRounds - 1)
  );

  // handle workout timer start
  const handleStart = async () => {
    setRoundInfo({ round_info: roundInfo });
    setWorkoutRounds(workoutRounds);
    setWorkoutRoundTime(workoutRoundTime);
    setWorkoutRestTime(workoutRestTime);
    setWorkoutWarmupTime(workoutWarmupTime);
    setIsWorkoutMode(true);
    await addToHistory(id);
    await incrementPlays(id, path);
  };

  if (!isWorkoutMode) {
    return (
      <>
        <div key={id} className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.usernameContainer}>
              <div className={styles.avatar}>
                <div>{name?.charAt(0)}</div>
              </div>
              <p>{createdBy}</p>
            </div>
            <div className={styles.cardTopRight}>
              <span>{formatTimeAgo(createdAt)}</span>
              <HiOutlineEllipsisHorizontal
                size={25}
                onClick={() => setShowDeleteModal((prev) => !prev)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <h1>{title}</h1>
          <div className={styles.overview}>
            <p>{description}</p>
          </div>
          <div className={styles.info}>
            <div className={styles.infoDisplay}>
              <MdOutlineTimer size={20} />
              <span>{formatTimeDisplay(totalTime)}</span>
            </div>
            <div className={styles.infoDisplay}>
              <BsLightningCharge size={20} />
              <span>{workoutRounds}</span>
            </div>
            <div className={styles.infoDisplay}>
              <BsHourglassTop size={18} />
              <span>{formatTimeDisplay(workoutRoundTime)}</span>
            </div>
          </div>
          <div className={styles.comboContainer}>
            {roundInfo.map((round, index) => (
              <div className={styles.row} key={index}>
                <h2>Round {round.round}</h2>
                <ul className={styles.ul}>
                  {round.sequence.map((punch, index) => (
                    <React.Fragment key={index}>
                      <li className={styles.punchTag}>{punch}</li>
                      <div className={styles.arrow}>
                        <HiArrowSmRight />
                      </div>
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.workoutBottom}>
            <SocialDataDisplay
              likes={likes}
              plays={plays}
              id={id}
              userID={userID}
              saved={saved}
              isLiked={isLiked}
              savesCount={savesCount}
            />
            <div className={styles.btnContainer}>
              <form action={() => handleStart()}>
                <StartButton />
              </form>
            </div>
          </div>

          {showDeleteModal && <DeleteModal id={id} setShowDeleteModal={setShowDeleteModal} />}
        </div>
      </>
    );
  }

  return (
    <div className={styles.timerWrapper}>
      <WorkoutTimer id={id} setIsWorkoutMode={setIsWorkoutMode} isMuted={isMuted} />
      <button onClick={() => setIsMuted((prev) => !prev)} className={styles.muteBtn}>
        {isMuted ? <BsFillVolumeMuteFill size={25} /> : <BsFillVolumeUpFill size={25} />}
      </button>
    </div>
  );
}
