import styles from "./StartButton.module.scss";
import PulseLoader from "react-spinners/PulseLoader";
import { useFormStatus } from "react-dom";
import { FaPlay } from "react-icons/fa";

export default function Button() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className={styles.btnStart}>
      {pending ? (
        <PulseLoader
          loading={pending}
          color="black"
          aria-label="Loading Spinner"
          data-testid="loader"
          size={8}
        />
      ) : (
        <>
          <FaPlay size={15} /> Start
        </>
      )}
    </button>
  );
}
