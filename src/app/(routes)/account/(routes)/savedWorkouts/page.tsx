// export const dynamic = "force-dynamic";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserSavedWorkouts from "@/src/components/profile/UserSavedWorkouts/UserSavedWorkouts";

export default async function SavedWorkoutsPage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

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
