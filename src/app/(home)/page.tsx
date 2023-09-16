import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

// styles
import styles from "./page.module.scss";

// components
import WorkoutsFeed from "./WorkoutsFeed/WorkoutsFeed";
import Logo from "@/src/components/ui/Logo/Logo";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userID = "";

  if (user) {
    userID = user.id;
  }

  if (!user) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.hero}>
          <h1>
            Welcome to <span style={{ color: "white" }}>Fight</span>
            <span style={{ color: "var(--accent-color-blue)" }}>X</span>
          </h1>
          <p>the fastest way to a smoother boxing experience!</p>
          <Link href="/login">
            <button>Get Started</button>
          </Link>
        </div>

        <div className={styles.featureContainer}>
          <div className={styles.featureCard}>
            <h2>Timer</h2>
            <p>Do stuff with the timer and get sweaty</p>
          </div>
          <div className={styles.featureCard}>
            <h2>Feed</h2>
            <p>View workouts posted by other users</p>
          </div>
          <div className={styles.featureCard}>
            <h2>Create & Save</h2>
            <p>Post and save workouts for quick access</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapperUser}>
      <Logo variant={"home"} />
      <WorkoutsFeed userID={userID} />
    </div>
  );
}
