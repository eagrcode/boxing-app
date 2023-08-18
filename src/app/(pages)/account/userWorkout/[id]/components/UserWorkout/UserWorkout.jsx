"use client";

// styles
import styles from "./UserWorkout.module.scss";

// supabase client
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { useRouter } from "next/navigation";

// icons
import { TiDelete } from "react-icons/ti";
import { AiTwotoneEdit } from "react-icons/ai";
import { useState } from "react";

// components
import WorkoutForm from "../../../../components/WorkoutForm/WorkoutForm";

export default function UserWorkout({
  id,
  title,
  numberOfRounds,
  roundTime,
  restTime,
  warmupTime,
  roundInfo,
  workoutData,
  isPublic,
}) {
  console.log(workoutData);
  // init local state
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // init router
  const router = useRouter();

  // init supabase client
  const supabase = createClientComponentClient();

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.topContainer}>
        <div className={styles.titleContainer}>
          <h1>{title}</h1>
          <p>{isPublic ? "public" : "private"}</p>
        </div>
        <div className={styles.iconContainer}>
          <button onClick={() => handleDeleteWorkout(id)} aria-label="delete">
            <TiDelete size={30} style={{ color: "hsl(0, 60%, 40%)" }} />
          </button>
          <button onClick={() => handleEditMode()} aria-label="edit">
            <AiTwotoneEdit size={30} />
          </button>
        </div>
      </div>

      {!isEditMode ? (
        <>
          <div className={styles.container}>
            <h2>Info</h2>
            <div>
              <p>Total {numberOfRounds * roundTime} min</p>
              <p>{numberOfRounds} rounds</p>
              <p>{warmupTime} sec / warmup</p>
              <p>{roundTime} min / round</p>
              <p>{restTime} sec / rest</p>
            </div>
          </div>
          <div className={styles.container}>
            <h2>Combos</h2>
            {roundInfo.map((round, index) => (
              <div key={index}>
                <p>
                  Round {round.round} - {round.sequence.map((seq) => `${seq} `)}
                </p>
              </div>
            ))}
          </div>
          <button className={styles.startBtn}>Start</button>
        </>
      ) : (
        <WorkoutForm mode={"edit"} workoutID={id} />
      )}
    </div>
  );
}
