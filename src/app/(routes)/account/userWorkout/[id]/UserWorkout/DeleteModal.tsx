// styles
import styles from "./UserWorkout.module.scss";

// react
import { SetStateAction, Dispatch } from "react";

// supabase client
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// utils
import DeleteWorkout from "./deleteWorkout";

import { usePathname } from "next/navigation";
import DeleteButton from "./DeleteButton";

interface DeleteModalPropTypes {
  id: string;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteModal({ id, setShowDeleteModal }: DeleteModalPropTypes) {
  // init supabase client
  const supabase = createClientComponentClient();

  // init hooks
  const path = usePathname();

  const handleDeleteWorkout = async (id: string, path: string) => {
    await DeleteWorkout(id, path);
  };

  return (
    <div className={styles.deleteModal}>
      <div className={styles.modalTextContainer}>
        <p style={{ color: "var(--header-color-main)" }}>Delete workout?</p>
        <p style={{ color: "var(--text-color-accent)" }}>
          if You delete this workout, you won't be able to recover it.
        </p>
      </div>
      <div className={styles.modalButtonContainer}>
        <form action={() => handleDeleteWorkout(id, path)}>
          <DeleteButton />
        </form>
        <button
          onClick={() => setShowDeleteModal(false)}
          style={{ color: "var(--text-color-main)" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
