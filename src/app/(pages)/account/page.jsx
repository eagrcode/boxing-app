// styles
import styles from "./page.module.scss";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// components
import CreateWorkoutForm from "./components/WorkoutForm/WorkoutForm";
import UserWorkoutList from "./components/UserWorkoutList/UserWorkoutList";

export default async function AccountPage() {
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session && session.user;
  console.log(user.id);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <p>Hello!, {user.email}</p>
      <UserWorkoutList userID={user.id} />

      {/* <CreateWorkoutForm mode={"create"} /> */}
    </>
  );
}
