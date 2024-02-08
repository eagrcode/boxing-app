import styles from "./StartButton.module.scss";
import Button from "./Button";

export default function StartButton({ handleStart }: { handleStart: () => Promise<void> }) {
  return (
    <form className={styles.form} action={handleStart}>
      <Button />
    </form>
  );
}
