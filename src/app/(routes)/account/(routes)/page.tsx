export const dynamic = "force-dynamic";

import styles from "./page.module.scss";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserWorkoutList from "@/src/components/profile/UserWorkoutList/UserWorkoutList";

export default async function AccountPage() {
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const userID: string = user.id;
  return (
    <>
      <UserWorkoutList userID={userID} />
    </>
  );
}
