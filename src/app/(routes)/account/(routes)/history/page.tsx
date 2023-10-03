export const dynamic = "force-dynamic";

import styles from "./page.module.scss";
import getUserHistory from "./getUserHistory";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import HistoryItem from "./HistoryItem/HistoryItem";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
