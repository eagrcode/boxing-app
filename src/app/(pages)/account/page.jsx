// styles
import styles from "./page.module.scss";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import getUserSavedWorkouts from "@/src/utils/getUserSavedWorkouts";

// components
import UserWorkoutList from "./components/UserWorkoutList/UserWorkoutList";
import UserSavedWorkouts from "./components/UserSavedWorkouts/UserSavedWorkouts";

export default async function AccountPage() {
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session && session.user;

  const savedWorkouts = await getUserSavedWorkouts(user.id);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <p>Hello!, {user.email}</p>
      <UserWorkoutList userID={user.id} />
      <UserSavedWorkouts savedWorkouts={savedWorkouts} userID={user.id} />
    </>
  );
}
