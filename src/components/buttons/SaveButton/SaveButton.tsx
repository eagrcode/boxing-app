"use client";

// react
import { usePathname } from "next/navigation";

// styles
import styles from "./SaveButton.module.scss";

// icons
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

// utils
import saveWorkout from "./saveWorkout";

interface SaveButtonPropTypes {
  saved: { created_at: string; id: string; user_id: string | null; workout_id: string }[];
  id: string;
}

export default function SaveButton({ saved, id }: SaveButtonPropTypes) {
  const isSaved = saved.length > 0;

  const path = usePathname();

  return (
    <form action={() => saveWorkout(isSaved, id, path)}>
      <button type="submit" className={styles.saveBtn} style={{ color: "var(--text-color-main)" }}>
        {!isSaved ? <AiOutlineStar size={20} /> : <AiFillStar size={20} />}
      </button>
    </form>
  );
}
