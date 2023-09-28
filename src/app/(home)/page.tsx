import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";

// styles
import styles from "./page.module.scss";

// components
import WorkoutsFeed from "./WorkoutsFeed/WorkoutsFeed";
import Logo from "@/src/components/ui/Logo/Logo";

import FistLeft from "@/public/assets/images/fist-left.png";
import FistRight from "@/public/assets/images/fist-right.png";

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
            Welcome to <span style={{ color: "var(--header-color-main)" }}>Fight</span>
            <span style={{ color: "var(--accent-color-blue)" }}>X</span>
          </h1>
          <p>The fastest way to a smoother boxing experience!</p>
          <Link href="/login">
            <button>Get Started</button>
          </Link>
        </div>

        <div className={styles.featuresWrapper}>
          <div className={styles.featuresHeader}>
            {/* <div className={styles.fistLeft}>
              <Image
                src={FistLeft}
                alt="Fist left"
                style={{ height: "auto", width: "100%" }}
              ></Image>
            </div> */}
            <h2>Explore the features</h2>
            {/* <div className={styles.fistRight}>
              <Image
                src={FistRight}
                alt="Fist right"
                style={{ height: "auto", width: "100%" }}
              ></Image>
            </div> */}
          </div>

          <div className={styles.featureContainer}>
            <div className={styles.featureCard}>
              <h2>Timer</h2>
              <p>Generate random combinations every round</p>
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
