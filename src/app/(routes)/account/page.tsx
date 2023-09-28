export const dynamic = "force-dynamic";

// styles
import styles from "./page.module.scss";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// components
import UserWorkoutList from "./UserWorkoutList/UserWorkoutList";

export default async function AccountPage() {
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const userID: string = session.user.id;

  return (
    <>
      <UserWorkoutList userID={userID} />
    </>
  );
}
