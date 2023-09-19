import styles from "./PostSkeleton.module.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PostSkeleton() {
  return (
    <SkeletonTheme highlightColor="#181b25" baseColor="#737373">
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.usernameContainer}>
            <Skeleton circle width={25} height={25} />
            <Skeleton count={1} width={100} />
          </div>
          <Skeleton count={1} width={30} />
        </div>
        <h2>
          <Skeleton />
        </h2>
        <div className={styles.overview}>
          <Skeleton count={3} />
        </div>
        <div className={styles.info}>
          <Skeleton count={1} width={50} />
          <Skeleton count={1} width={50} />
          <Skeleton count={1} width={50} />
        </div>
        <div className={styles.socialBtnContainer}>
          <Skeleton />
        </div>
      </div>
    </SkeletonTheme>
  );
}
