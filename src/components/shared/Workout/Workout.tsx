"use client";

import styles from "./Workout.module.scss";
import React from "react";
import { useWorkoutTimerDataContext } from "@/src/context/WorkoutTimerData.context";
import SocialDataDisplay from "../SocialDataDisplay/SocialDataDisplay";
import { MdOutlineTimer } from "react-icons/md";
import { BsLightningCharge, BsHourglassTop } from "react-icons/bs";
import { HiArrowSmRight } from "react-icons/hi";
import formatTimeAgo from "@/src/lib/utils/formatTimeAgo";
import formatTimeDisplay from "@/src/lib/utils/formatTimeDisplay";
import addToHistory from "@/src/lib/services/timer/addToHistory";
import incrementPlays from "@/src/lib/services/timer/incrementPlays";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import StartButton from "@/src/components/buttons/StartButton/StartButton";
import DiscoverBackButton from "../../buttons/DiscoverBackButton/DiscoverBackButton";
import WorkoutAvatar from "../WorkoutAvatar/WorkoutAvatar";
import { Workout } from "@/src/lib/types/workout.types";
import { useAppSelector } from "@/src/redux/hooks";

export default function Workout({ selectedWorkout }: { selectedWorkout: Workout }) {
  const { isActive } = useAppSelector((state) => state.workout);

  const {
    setWorkoutRounds,
    setWorkoutRoundTime,
    setWorkoutRestTime,
    setWorkoutWarmupTime,
    setRoundInfo,
    isWorkoutMode,
    setIsWorkoutMode,
  } = useWorkoutTimerDataContext();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const totalTime = Math.floor(
    selectedWorkout.workout_data.warmup_time +
      selectedWorkout.workout_data.round_time * selectedWorkout.workout_data.number_of_rounds +
      selectedWorkout.workout_data.rest_time * (selectedWorkout.workout_data.number_of_rounds - 1)
  );

  const handleStart = async () => {
    await addToHistory(selectedWorkout.workout_id);
    await incrementPlays(selectedWorkout.workout_id, pathname);

    setRoundInfo({ round_info: selectedWorkout.workout_data.round_info });
    setWorkoutRounds(selectedWorkout.workout_data.number_of_rounds);
    setWorkoutRoundTime(selectedWorkout.workout_data.round_time);
    setWorkoutRestTime(selectedWorkout.workout_data.rest_time);
    setWorkoutWarmupTime(selectedWorkout.workout_data.warmup_time);
    setIsWorkoutMode(true);

    const params = new URLSearchParams(searchParams);
    params.set("timer_mode", "active");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={`${styles.card} ${isActive && styles.isActive}`}>
      <div className={styles.cardTop}>
        <div className={styles.cardTopLeft}>
          <WorkoutAvatar
            fullName={selectedWorkout.profiles_data.full_name}
            avatarURL={selectedWorkout.profiles_data.avatar_url}
          />
          <p>{selectedWorkout.workout_data.created_by}</p>
          <span>-</span>
          <span>{formatTimeAgo(selectedWorkout.workout_data.created_at)}</span>
        </div>
        <div className={styles.cardTopRight}>
          <DiscoverBackButton />
        </div>
      </div>
      <div className={styles.titleContainer}>
        <h1>{selectedWorkout.workout_data.title}</h1>
      </div>
      <div className={styles.overview}>
        <p>{selectedWorkout.workout_data.description}</p>
      </div>
      <div className={styles.info}>
        <div className={styles.infoDisplay}>
          <MdOutlineTimer size={20} />
          <span>{formatTimeDisplay(totalTime)}</span>
        </div>
        <div className={styles.infoDisplay}>
          <BsLightningCharge size={20} />
          <span>{selectedWorkout.workout_data.number_of_rounds}</span>
        </div>
        <div className={styles.infoDisplay}>
          <BsHourglassTop size={18} />
          <span>{formatTimeDisplay(selectedWorkout.workout_data.round_time)}</span>
        </div>
      </div>
      <div className={styles.comboContainer}>
        {selectedWorkout.workout_data.round_info.map((round, index) => (
          <div className={styles.row} key={index}>
            <h2>Round {round.round}</h2>
            <ul className={styles.ul}>
              {round.sequence.map((punch, index) => (
                <React.Fragment key={index}>
                  <li className={styles.punchTag}>{punch}</li>{" "}
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
          plays={selectedWorkout.workout_data.plays}
          id={selectedWorkout.workout_id}
          isLiked={selectedWorkout.is_liked}
          isSaved={selectedWorkout.is_saved}
          likesCount={selectedWorkout.likes_count}
          savesCount={selectedWorkout.saves_count}
        />
      </div>
      <div className={styles.btnContainer}>
        <form action={() => handleStart()}>
          <StartButton />
        </form>
      </div>
    </div>
  );

  // if (isWorkoutMode) {
  //   return (
  //     <div className={styles.timerWrapper}>
  //       <WorkoutTimer id={id} setIsWorkoutMode={setIsWorkoutMode} isMuted={isMuted} />
  //       <button onClick={() => setIsMuted((prev) => !prev)} className={styles.muteBtn}>
  //         {isMuted ? <BsFillVolumeMuteFill size={25} /> : <BsFillVolumeUpFill size={25} />}
  //       </button>
  //     </div>
  //   );
  // }
}
