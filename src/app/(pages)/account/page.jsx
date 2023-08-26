// styles
import styles from "./page.module.scss";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <p>Hello!, {user.email}</p>
      <UserWorkoutList userID={user.id} />
      <UserSavedWorkouts userID={user.id} />
    </>
  );
}
