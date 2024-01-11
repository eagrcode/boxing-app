import styles from "./page.module.scss";
import Logo from "@/src/components/shared/Logo/Logo";
import WorkoutsFeed from "@/src/components/shared/WorkoutsFeed/WorkoutsFeed";
import { getUser } from "@/src/lib/services/user/getUser";

export default async function DiscoverPage() {
  const user = await getUser();

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
