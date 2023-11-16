// export const dynamic = "force-dynamic";

import styles from "./page.module.scss";
import UserAccountNav from "@/src/components/profile/UserAccountNav/UserAccountNav";
import LogoutButton from "@/src/components/buttons/LogoutButton/LogoutButton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getProfileData from "@/src/lib/services/getProfileData";
import Image from "next/image";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

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
            <h1>{profileData?.full_name}</h1>
            <LogoutButton />
          </div>
          <p>{profileData?.username || profileData?.email}</p>
        </div>

        {user?.user_metadata.avatar_url ? (
          <div className={styles.googleAvatar}>
            <Image
              src={`${user?.user_metadata.avatar_url}`}
              alt="User avatar"
              height={65}
              width={65}
            />
          </div>
        ) : (
          <div className={styles.avatar}>
            <div>{profileData?.full_name.charAt(0)}</div>
          </div>
        )}
      </div>
      <UserAccountNav />
      {children}
    </div>
  );
}
