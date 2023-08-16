// styles
import styles from "./Hamburger.module.scss";

// react
import { Dispatch, SetStateAction } from "react";

// set prop types
type props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Hamburger({ isOpen, setIsOpen }: props) {
  // toggle nav menu
  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <button aria-label="Menu" className={styles.button} onClick={handleClick}>
      <div className={isOpen ? `${styles.hamburger} ${styles.active}` : styles.hamburger}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
    </button>
  );
}
