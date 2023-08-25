"use client";

// react
import { useState } from "react";

// supabase
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// styles
import styles from "./SaveButton.module.scss";

// icons
import { FaRegStar } from "react-icons/fa";

export default function SaveButton({ saved, id, userID }) {
  const isSaved = saved.length > 0;

  // init state
  const [isSavedByUser, setIsSavedByUser] = useState(isSaved);

  // init supabase client
  const supabase = createClientComponentClient();

  // check if user has already liked this workout - convert to bool
  // const findSave = !!saves.find((save) => save.user_id === userID);

  // const [isSavedByUser, setIsSavedByUser] = useState(findSave);

  // handle like post
  const handleSaveWorkout = async () => {
    if (!isSavedByUser) {
      const { data, error } = await supabase
        .from("users_saved_workouts")
        .insert([{ workout_id: id, user_id: userID }])
        .select();

      if (error) {
        console.log(error.message);
      } else {
        console.log("Saved: ", data);
        setIsSavedByUser((prev) => !prev);
      }
    } else {
      const { data, error } = await supabase
        .from("users_saved_workouts")
        .delete()
        .eq("workout_id", id);

      if (error) {
        console.log(error.message);
      } else {
        console.log("Unsaved: ", data);
        setIsSavedByUser((prev) => !prev);
      }
    }
  };

  return (
    <button
      onClick={handleSaveWorkout}
      className={styles.saveBtn}
      style={{ color: `${isSavedByUser ? "yellow" : "var(--text-color-main)"}` }}
    >
      <FaRegStar size={20} />
      Save
    </button>
  );
}
