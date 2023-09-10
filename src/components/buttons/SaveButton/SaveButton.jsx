"use client";

// react
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { revalidatePath } from "next/cache";

// supabase

// styles
import styles from "./SaveButton.module.scss";

// icons
import { BsSave, BsSaveFill } from "react-icons/bs";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import saveWorkout from "@/src/lib/actions/saveWorkout";

export default function SaveButton({ saved, id, userID }) {
  const isSaved = saved?.length > 0;

  const path = usePathname();

  return (
    <form action={() => saveWorkout(isSaved, id, path)}>
      <button type="submit" className={styles.saveBtn} style={{ color: "var(--text-color-main)" }}>
        {!isSaved ? <AiOutlineStar size={25} /> : <AiFillStar size={25} />}
      </button>
    </form>
  );
}
