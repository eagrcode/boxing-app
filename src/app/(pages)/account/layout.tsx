// styles
import LogoutButton from "@/src/components/LogoutButton";
import styles from "./page.module.scss";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";
import Link from "next/link";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  // init supabase client
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className={styles.wrapper}>
      <div className={styles.layoutTop}>
        <div className={styles.topLeft}>
          <h1>Elliot Robinson</h1>
          <p>{user?.email}</p>
        </div>
        <div className={styles.avatar}>ER</div>
      </div>
      <LogoutButton />
      <div className={styles.linkContainer}>
        <Link className={styles.link} href="/account">
          My Workouts
        </Link>
        <Link className={styles.link} href="/account/savedWorkouts">
          Saved Workouts
        </Link>
      </div>

      {children}
    </div>
  );
}
