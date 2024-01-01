import styles from "./page.module.scss";
import Logo from "@/src/components/shared/Logo/Logo";
import WorkoutsFeed from "@/src/components/shared/WorkoutsFeed/WorkoutsFeed";
import { getSupaUser } from "@/src/lib/utils/getSupaUser";

export default async function DiscoverPage() {
  const user = await getSupaUser();

  let userID = "";

  if (user) {
    userID = user.id;
  }

  return (
    <div className={styles.pageWrapper}>
      <Logo variant={"home"} />
      <WorkoutsFeed userID={userID} />
      <WorkoutsFeed userID={userID} />
      <WorkoutsFeed userID={userID} />
    </div>
  );
}
