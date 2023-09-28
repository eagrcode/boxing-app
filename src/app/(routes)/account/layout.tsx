export const dynamic = "force-dynamic";

// styles
import styles from "./page.module.scss";

// components
import UserAccountNav from "./UserAccountNav/UserAccountNav";
import LogoutButton from "@/src/components/buttons/LogoutButton/LogoutButton";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";

// utils
import getProfileData from "@/src/lib/services/getProfileData";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  // init supabase client
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // get users profile data
  const profileData = await getProfileData(user?.id);

  return (
    <div className={styles.wrapper}>
      <header>Account</header>
      <div className={styles.layoutTop}>
        <div className={styles.topLeft}>
          <div>
            <h1>
              {profileData?.first_name} {profileData?.last_name}
            </h1>
            <LogoutButton />
          </div>
          <p>{profileData?.username}</p>
        </div>
        <div className={styles.avatar}>
          <div>
            {profileData?.first_name.charAt(0)}
            {profileData?.last_name.charAt(0)}
          </div>
        </div>
      </div>
      <UserAccountNav />
      {children}
    </div>
  );
}
