import styles from "./page.module.scss";
import getUserHistory from "@/src/lib/services/profile/getUserHistory";
import HistoryItem from "@/src/components/profile/HistoryItem/HistoryItem";
import { getUser } from "@/src/lib/services/user/getUser";
import NoWorkouts from "@/src/components/profile/NoWorkouts/NoWorkouts";

export default async function page() {
  const user = await getUser();

  let userID: string = "";

  if (user) {
    userID += user.id;
  }

  const history = await getUserHistory(userID);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.discoverWrapper}>
        {history.length ? (
          <ul className={styles.list}>
            {history.map((item, index) => (
              <HistoryItem
                key={index}
                id={item.workouts.id}
                createdAt={item.created_at}
                title={item.workouts.title}
              />
            ))}
          </ul>
        ) : (
          <NoWorkouts variant="profile-history" />
        )}
      </div>
    </div>
  );
}
