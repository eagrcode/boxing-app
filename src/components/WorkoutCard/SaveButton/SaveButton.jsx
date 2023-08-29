"use client";

// react

// supabase
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// context
import { useSaveContext } from "../../../context/useSaveContext";

// styles
import styles from "./SaveButton.module.scss";

// icons
import { FaRegStar } from "react-icons/fa";

export default function SaveButton({ saved, id, userID }) {
  // destructure context
  const { savedWorkouts } = useSaveContext();

  // check if user has saved this workout
  const isSaved = savedWorkouts.some(
    (workout) => workout.workout_id === id && workout.user_id === userID
  );

  // init supabase client
  const supabase = createClientComponentClient();

  // handle save workout
  const handleSaveWorkout = async () => {
    if (!isSaved) {
      const { data, error } = await supabase
        .from("user_saved_workouts")
        .insert([{ workout_id: id }])
        .select();

      if (error) {
        console.log(error.message);
      } else {
        console.log("Saved: ", data);
      }
    } else {
      const { data, error } = await supabase
        .from("user_saved_workouts")
        .delete()
        .eq("workout_id", id);

      if (error) {
        console.log(error.message);
      } else {
        console.log("Unsaved: ", data);
      }
    }
  };

  return (
    <button
      onClick={handleSaveWorkout}
      className={styles.saveBtn}
      style={{ color: `${isSaved ? "yellow" : "var(--text-color-main)"}` }}
    >
      <FaRegStar size={20} />
      Save
    </button>
  );
}
