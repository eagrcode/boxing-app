import PostSkeleton from "@/src/components/ui/PostSkeleton/PostSkeleton";
import styles from "./page.module.scss";
import Logo from "@/src/components/ui/Logo/Logo";

export default function Loading() {
  return (
    <div className={styles.pageWrapperUser}>
      <Logo variant={"home"} />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  );
}
