// export const dynamic = "force-dynamic";

import styles from "./page.module.scss";
import getUserHistory from "@/src/lib/services/getUserHistory";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import HistoryItem from "@/src/components/profile/HistoryItem/HistoryItem";

export default async function page() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

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
