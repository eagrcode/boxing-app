"use client";

// styles
import styles from "./UserWorkout.module.scss";

// react
import { useState } from "react";
import React from "react";

// next
import { useRouter } from "next/navigation";

// icons
import { GiHighPunch } from "react-icons/gi";
import { HiArrowSmRight } from "react-icons/hi";
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import { MdOutlineTimer } from "react-icons/md";
import { BsLightningCharge, BsHourglassTop } from "react-icons/bs";

// context
import { useWorkoutTimerDataContext } from "@/src/context/WorkoutTimerData.context";

// utils
import formatTimeAgo from "@/src/lib/utils/formatTimeAgo";
import formatTimeDisplay from "@/src/lib/utils/formatTimeDisplay";

// components
import DeleteModal from "./DeleteModal";
import SocialDataDisplay from "@/src/components/ui/SocialDataDisplay/SocialDataDisplay";

import addToHistory from "@/src/lib/services/addToHistory";

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
}: UserWorkoutPropTypes) {
  // init state
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  // init hooks
  const router = useRouter();

  // destructure context
  const {
    setWorkoutRounds,
    setWorkoutRoundTime,
    setWorkoutRestTime,
    setWorkoutWarmupTime,
    setRoundInfo,
    setIsWorkoutMode,
  } = useWorkoutTimerDataContext();

  // calc total workout time
  const totalTime = Math.floor(
    workoutWarmupTime + workoutRoundTime * workoutRounds + workoutRestTime * (workoutRounds - 1)
  );

  // const handleEditMode = () => {
  //   setIsEditMode((prev) => !prev);
  // };

  // handle workout timer start
  const handleStart = async () => {
    setRoundInfo({ round_info: roundInfo });
    setWorkoutRounds(workoutRounds);
    setWorkoutRoundTime(workoutRoundTime);
    setWorkoutRestTime(workoutRestTime);
    setWorkoutWarmupTime(workoutWarmupTime);
    setIsWorkoutMode(true);
    router.push(`/workout/${id}`);
    await addToHistory(id);
  };

  return (
    <>
      <div key={id} className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.usernameContainer}>
            <GiHighPunch size={20} />
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
            <span>
              {workoutRounds} round{workoutRounds > 1 && "s"}
            </span>
          </div>
          <div className={styles.infoDisplay}>
            <BsHourglassTop size={20} />
            <span>{formatTimeDisplay(workoutRoundTime)} / round</span>
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
          />
          <div className={styles.btnContainer}>
            <button onClick={handleStart} className={styles.btnStart}>
              START
            </button>
          </div>
        </div>

        {showDeleteModal && <DeleteModal id={id} setShowDeleteModal={setShowDeleteModal} />}
      </div>
    </>
  );
}
