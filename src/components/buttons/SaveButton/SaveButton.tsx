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
  saved: boolean | null;
  id: string;
}

export default function SaveButton({ saved, id }: SaveButtonPropTypes) {
  const path = usePathname();

  return (
    <form action={() => saveWorkout(saved, id, path)}>
      <button type="submit" className={styles.saveBtn} style={{ color: "var(--text-color-main)" }}>
        {!saved ? <AiOutlineStar size={20} /> : <AiFillStar size={20} />}
      </button>
    </form>
  );
}
