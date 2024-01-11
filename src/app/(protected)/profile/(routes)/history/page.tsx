// export const dynamic = "force-dynamic";

import styles from "./page.module.scss";
import getUserHistory from "@/src/lib/services/profile/getUserHistory";
import HistoryItem from "@/src/components/profile/HistoryItem/HistoryItem";
import { getUser } from "@/src/lib/services/user/getUser";

export default async function page() {
  const user = await getUser();

  let userID = "";

  if (user) {
    userID = user.id;
  }

  const history = await getUserHistory(userID);

  return (
    <div className={styles.wrapper}>
      {history && (
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
      )}
    </div>
  );
}
