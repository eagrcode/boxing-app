import styles from "./PageLoader.module.scss";
import PulseLoader from "react-spinners/PulseLoader";
import { GiHighPunch } from "react-icons/gi";

export default function PageLoader() {
  return (
    <div className={styles.loadingContainer}>
      <GiHighPunch size={50} />
      Loading...
    </div>
  );
}
