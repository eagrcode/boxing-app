"use client";

// react
import { usePathname } from "next/navigation";

// styles
import styles from "./SaveButton.module.scss";

// icons
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import { experimental_useOptimistic as useOptimistic } from "react";
import Button from "./Button";

// utils
import saveWorkout from "./saveWorkout";

interface SaveButtonPropTypes {
  saved: boolean | null;
  id: string;
  onToggleSave: (newState: any) => void;
}

export default function SaveButton({ saved, id, onToggleSave }: SaveButtonPropTypes) {
  const path = usePathname();

  const [optimisticSave, toggleOptimisticSave] = useOptimistic(saved, (state, _) => !state);

  return (
    <form
      action={async () => {
        toggleOptimisticSave(saved);
        onToggleSave(!saved);
        await saveWorkout(saved, id, path);
      }}
    >
      <Button optimisticSave={optimisticSave} />
    </form>
  );
}
