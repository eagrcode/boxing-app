export const dynamic = "force-dynamic";

// styles
import styles from "./page.module.scss";

// components
import WorkoutForm from "@/src/components/forms/CreateEditWorkout/CreateEditWorkout";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function CreateWorkoutPage() {
  // init supabase client
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className={styles.wrapper}>
      <header>New Workout</header>
      <WorkoutForm mode={"create"} />
    </div>
  );
}
