export const dynamic = "force-dynamic";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// components
import UserSavedWorkouts from "./UserSavedWorkouts/UserSavedWorkouts";

export default async function SavedWorkoutsPage() {
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const userID: string = session.user.id;

  return <UserSavedWorkouts userID={userID} />;
}
