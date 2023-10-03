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
import Image from "next/image";

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
            <h1>{profileData?.full_name}</h1>
            <LogoutButton />
          </div>
          <p>{profileData?.username || profileData?.email}</p>
        </div>
        <div className={styles.avatar}>
          <div>{profileData?.full_name.charAt(0)}</div>
          {/* <Image
            src={`${user?.user_metadata.avatar_url}`}
            alt="User avatar"
            style={{ height: "auto", width: "100%" }}
            height={70}
            width={70}
          /> */}
        </div>
      </div>
      <UserAccountNav />
      {children}
    </div>
  );
}
