// export const dynamic = "force-dynamic";

import styles from "./page.module.scss";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import UserWorkoutList from "@/src/components/profile/UserWorkoutList/UserWorkoutList";

export default async function AccountPage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // get session data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userID = "";

  if (user) {
    userID = user.id;
  }

  return (
    <>
      <UserWorkoutList userID={userID} />
    </>
  );
}
