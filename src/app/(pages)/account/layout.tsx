// styles
import styles from "./page.module.scss";

// components
import UserAccountNav from "@/src/components/ui/UserAccountNav/UserAccountNav";
import LogoutButton from "@/src/components/buttons/LogoutButton/LogoutButton";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";
import Link from "next/link";

// utils
import getProfileData from "@/src/lib/services/getProfileData";

export const dynamic = "force-dynamic";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  // init supabase client
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // get users profile data
  const profileData = await getProfileData(user?.id);

  console.log(profileData);

  return (
    <div className={styles.wrapper}>
      <header>Account</header>
      <div className={styles.layoutTop}>
        <div className={styles.topLeft}>
          <h1>
            {profileData?.first_name} {profileData?.last_name}
          </h1>
          <p>{profileData?.username}</p>
        </div>
        <div className={styles.avatar}>
          {profileData?.first_name.charAt(0)}
          {profileData?.last_name.charAt(0)}
        </div>
      </div>
      <LogoutButton />
      <UserAccountNav />

      {children}
    </div>
  );
}
