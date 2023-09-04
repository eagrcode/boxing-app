"use client";

// styles
import styles from "./UserWorkout.module.scss";

// supabase client
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { useRouter } from "next/navigation";
import Link from "next/link";

// react
import { useState } from "react";

// icons
import { TiDelete } from "react-icons/ti";
import { AiTwotoneEdit } from "react-icons/ai";
import { RiTimerLine } from "react-icons/ri";
import { GiHighPunch } from "react-icons/gi";

// context
import { useWorkoutMode } from "@/src/context/useWorkoutMode";

// components
import WorkoutForm from "@/src/components/forms/CreateEditWorkout/CreateEditWorkout";
import WorkoutTimer from "@/src/components/timers/WorkoutTimer/WorkoutTimer";
import LikeButton from "@/src/components/buttons/LikeButton/LikeButton";
import LikesDisplay from "@/src/components/ui/LikesDisplay/LikesDisplay";

export default function UserWorkout({
  id,
  userID,
  title,
  roundInfo,
  workoutRounds,
  workoutWarmupTime,
  workoutRoundTime,
  workoutRestTime,
  createdAt,
  workoutData,
  likes,
}) {
  console.log(workoutData);
  // init local state
  const [isEditMode, setIsEditMode] = useState(false);

  // destructure context
  const {
    isWorkoutMode,
    setIsWorkoutMode,
    setWorkoutRounds,
    setWorkoutRoundTime,
    setWorkoutRestTime,
    setWorkoutWarmupTime,
    setSelectedWorkout,
  } = useWorkoutMode();

  // init router
  const router = useRouter();

  // init supabase client
  const supabase = createClientComponentClient();

  // format created_at response from db
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = ("0" + date.getDate()).slice(-2); // ensures 2 digits
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // ensures 2 digits, +1 because months are 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  // call function and assign formatted value
  createdAt = createdAt && formatDate(createdAt);

  // calc total workout time
  const totalTime = Math.floor(
    workoutWarmupTime + workoutRoundTime * workoutRounds + (workoutRestTime * workoutRounds) / 60
  );

  const handleDeleteWorkout = async (id) => {
    try {
      const { error } = await supabase.from("workouts").delete().eq("id", id);
      if (error) {
        console.error("Supabase error:", error.message);
        return; // Exit early if there's an error
      }
      router.push("/account");
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }
  };

  const handleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  // handle workout timer start
  const handleStart = () => {
    setSelectedWorkout(workoutData);
    setWorkoutRounds(numberOfRounds);
    setWorkoutRoundTime(roundTime);
    setWorkoutRestTime(restTime);
    setWorkoutWarmupTime(warmupTime);
    setIsWorkoutMode(true);
  };

  if (!isWorkoutMode) {
    return (
      <div key={id} className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.usernameContainer}>
            <GiHighPunch size={20} />
            <p>eagrobinson</p>
          </div>
          <span>{createdAt}</span>
        </div>
        <h2>
          <Link href={`/account/userWorkout/${id}`}>{title}</Link>
        </h2>
        <div className={styles.overview}>
          <h3>Info</h3>
          <span>
            <RiTimerLine />
            {totalTime} mins
          </span>
          <span>
            {workoutRounds} round{workoutRounds > 1 && "s"}
          </span>
          <span>{workoutWarmupTime} sec / warmup</span>
          <span>{workoutRoundTime} sec / round</span>
          <span></span>
        </div>
        <div className={styles.exerciseContainer}>
          <h3>Combo's</h3>
          <div className={styles.comboContainer}>
            {roundInfo.map((round, index) => (
              <span key={index}>
                Round {round.round} : {round.sequence}
              </span>
            ))}
          </div>
        </div>
        {/* <div className={styles.btnContainer}>
        <button className={styles.btnStart}>START</button>
        
      </div> */}
        <div className={styles.socialBtnContainer}>
          <LikeButton id={id} userID={userID} likes={likes} />
          <LikesDisplay id={id} userID={userID} likes={likes} />
        </div>
      </div>
      // <div className={styles.wrapper}>
      //   <div className={styles.topContainer}>
      //     <div className={styles.titleContainer}>
      //       <h1>{title}</h1>
      //       <button onClick={() => handleEditMode()} aria-label="edit">
      //         <AiTwotoneEdit size={30} />
      //       </button>
      //       {/* <p>{isPublic ? "public" : "private"}</p> */}
      //     </div>
      //     <div className={styles.iconContainer}>
      //       <button onClick={() => handleDeleteWorkout(id)} aria-label="delete">
      //         <TiDelete size={30} />
      //       </button>
      //     </div>
      //   </div>

      //   {!isEditMode ? (
      //     <>
      //       <div className={styles.container}>
      //         <h2>Info</h2>
      //         <div>
      //           <p>Total {numberOfRounds * roundTime} min</p>
      //           <p>{numberOfRounds} rounds</p>
      //           <p>{warmupTime} sec / warmup</p>
      //           <p>{roundTime} min / round</p>
      //           <p>{restTime} sec / rest</p>
      //         </div>
      //       </div>
      //       <div className={styles.container}>
      //         <h2>Combos</h2>
      //         {roundInfo.map((round, index) => (
      //           <div key={index}>
      //             <p>
      //               Round {round.round} - {round.sequence.map((seq) => `${seq} `)}
      //             </p>
      //           </div>
      //         ))}
      //       </div>
      //       <button onClick={handleStart} className={styles.startBtn}>
      //         Start
      //       </button>
      //     </>
      //   ) : (
      //     <WorkoutForm mode={"edit"} workoutID={id} setIsEditMode={setIsEditMode} />
      //   )}
      // </div>
    );
  }

  if (isWorkoutMode) {
    return <WorkoutTimer />;
  }
}
