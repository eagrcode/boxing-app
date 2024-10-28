import styles from "./DeleteModal.module.scss";
import { SetStateAction, Dispatch } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DeleteWorkout from "./deleteWorkout";
import { usePathname } from "next/navigation";
import DeleteButton from "./DeleteButton";

interface DeleteModalPropTypes {
  id: string;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteModal({
  id,
  setShowDeleteModal,
}: DeleteModalPropTypes) {
  // init supabase client
  const supabase = createClientComponentClient();

  // init hooks
  const path = usePathname();

  const handleDeleteWorkout = async (id: string, path: string) => {
    await DeleteWorkout(id, path);
  };

  return (
    <div className={styles.deleteModal}>
      <p>if You delete this workout, you won't be able to recover it.</p>
      <div className={styles.btnContainer}>
        <form
          className={styles.form}
          action={() => handleDeleteWorkout(id, path)}
        >
          <DeleteButton />
        </form>
        <button
          className={styles.btnSecondary}
          onClick={() => setShowDeleteModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
