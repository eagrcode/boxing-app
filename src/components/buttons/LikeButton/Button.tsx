import styles from "./LikeButton.module.scss";
import { useFormStatus } from "react-dom";
import { GiPunchBlast } from "react-icons/gi";

export default function Button({ optimisticLike }: { optimisticLike: boolean | null }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={`${styles.likeBtn} ${optimisticLike && styles.active}`}
    >
      <GiPunchBlast size={20} />
    </button>
  );
}
