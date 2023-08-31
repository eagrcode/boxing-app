"use client";

// react
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { revalidatePath } from "next/cache";

// supabase

// styles
import styles from "./SaveButton.module.scss";

// icons
import { FaRegStar } from "react-icons/fa";

import saveWorkout from "@/src/utils/saveWorkout";

export default function SaveButton({ saved, id, userID }) {
  const isSaved = saved?.length > 0;

  const path = usePathname();

  return (
    <form action={() => saveWorkout(isSaved, id, path)}>
      <button
        type="submit"
        className={styles.saveBtn}
        style={{ color: `${isSaved ? "yellow" : "var(--text-color-main)"}` }}
      >
        <FaRegStar size={20} />
        {isSaved ? "Saved" : "Save"}
      </button>
    </form>
  );
}
