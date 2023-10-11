import styles from "./SaveButton.module.scss";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export default function Button({ optimisticSave }: { optimisticSave: boolean | null }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={styles.saveBtn}
      style={{ color: "var(--text-color-main)" }}
    >
      {!optimisticSave ? <AiOutlineStar size={20} /> : <AiFillStar size={20} />}
    </button>
  );
}
