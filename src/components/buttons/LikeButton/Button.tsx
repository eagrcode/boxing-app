import styles from "./LikeButton.module.scss";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { GiPunchBlast } from "react-icons/gi";

export default function Button({ optimisticLike }: { optimisticLike: boolean | null }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={styles.likeBtn}
      style={{
        color: `${optimisticLike ? "var(--accent-color-blue)" : "var(--text-color-main)"}`,
      }}
    >
      <GiPunchBlast size={20} />
    </button>
  );
}
