// styles
import styles from "./page.module.scss";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// components
import UserWorkoutList from "@/src/components/ui/UserWorkoutList/UserWorkoutList";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const user = session && session.user;

  return (
    <>
      <UserWorkoutList userID={user.id} />
    </>
  );
}
