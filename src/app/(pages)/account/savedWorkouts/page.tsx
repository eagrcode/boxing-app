// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";

// components
import UserSavedWorkouts from "../../../../components/ui/UserSavedWorkouts/UserSavedWorkouts";

// services
import getUserSavedWorkouts from "@/src/lib/services/getUserSavedWorkouts";

export default async function SavedWorkoutsPage() {
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session && session.user;

  const savedWorkouts = await getUserSavedWorkouts(user?.id);

  return (
    <>
      <UserSavedWorkouts savedWorkouts={savedWorkouts} userID={user?.id} />
    </>
  );
}
