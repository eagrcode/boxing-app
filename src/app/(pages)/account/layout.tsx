// styles
import styles from "./page.module.scss";

// components
import UserAccountNav from "@/src/components/UserAccountNav/UserAccountNav";
import LogoutButton from "@/src/components/buttons/LogoutButton/LogoutButton";

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
      <UserAccountNav />

      {children}
    </div>
  );
}
