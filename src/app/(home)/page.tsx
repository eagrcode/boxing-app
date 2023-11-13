export const dynamic = "force-dynamic";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";
import WorkoutsFeed from "./WorkoutsFeed/WorkoutsFeed";
import Logo from "@/src/components/ui/Logo/Logo";
import TimerImg from "@/public/assets/images/timer-img.png";
import FeedImg from "@/public/assets/images/feed-img.png";
import ComboGImg from "@/public/assets/images/combo-g-img.png";
import MobileImg1 from "@/public/assets/images/4.png";
import MobileImg2 from "@/public/assets/images/5.png";
import MobileImg3 from "@/public/assets/images/6.png";

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
            <span style={{ color: "white" }}>BEAT</span>
            <span
              style={{
                color: "var(--accent-color-blue)",
              }}
            >
              DOWN
            </span>
          </h1>
          <p>
            Unlock your full potential, connect with fellow boxing enthusiasts, and take your
            fitness journey to the next level with Beatdown. Join our community of fighters today!
          </p>
          <div className={styles.btnContainer}>
            <Link href="/login">
              <button className={styles.btnL}>Get Started</button>
            </Link>
            <a href="#features">
              <button className={styles.btnR}>Explore</button>
            </a>
          </div>
        </div>

        <div className={styles.featuresWrapper} id="features">
          <div className={styles.featureContainer}>
            <div className={styles.featureCard}>
              <div className={styles.featureContent}>
                <h2>Crush Your Goals</h2>
                <p>
                  Our app doubles as a powerful interval timer, helping you optimise your training
                  sessions. Whether you're into high-intensity interval training or just need a
                  structured workout routine, Beatdown has got you covered.
                </p>
              </div>
              <div className={styles.featureImg}>
                <Image
                  src={TimerImg}
                  alt="Mobile timer"
                  style={{ height: "auto", width: "100%" }}
                  quality={100}
                  unoptimized
                ></Image>
              </div>
            </div>
            <div className={`${styles.featureCard} ${styles.rightAlignText}`}>
              <div className={`${styles.featureContent} ${styles.rightAlignText}`}>
                <h2>Connect and Inspire</h2>
                <p>
                  Join a thriving community of boxing enthusiasts who share your passion for the
                  sweet science. Upload your own workouts, discover routines from fellow users, and
                  interact with like-minded individuals. It's never been easier to find motivation
                  and inspiration to keep pushing your limits.
                </p>
              </div>
              <div className={styles.featureImg}>
                <Image
                  src={FeedImg}
                  alt="Mobile timer"
                  style={{ height: "auto", width: "100%" }}
                  quality={100}
                  unoptimized
                ></Image>
              </div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureContent}>
                <h2>Automatic Combo Generation</h2>
                <p>
                  New to boxing or just looking for some guidance? Beatdown offers an automatic
                  combo generation mode that provides you with ready-made combinations to follow
                  during your workouts. It's the perfect feature for beginners and anyone who wants
                  a helping hand in the ring.
                </p>
              </div>
              <div className={styles.featureImg}>
                <Image
                  src={ComboGImg}
                  alt="Mobile timer"
                  style={{ height: "auto", width: "100%" }}
                ></Image>
              </div>
            </div>
          </div>
        </div>
        <section className={styles.mobileFeaturesWrapper}>
          <div className={styles.mobileFeaturesContainer}>
            <h2>Fully Mobile Responsive</h2>
            <div className={styles.mobileImagesContainer}>
              <div className={styles.featureImg}>
                <Image
                  src={MobileImg1}
                  alt="Mobile timer"
                  style={{ height: "auto", width: "100%" }}
                ></Image>
              </div>
              <div className={styles.featureImg}>
                <Image
                  src={MobileImg2}
                  alt="Mobile timer"
                  style={{ height: "auto", width: "100%" }}
                ></Image>
              </div>
              <div className={styles.featureImg}>
                <Image
                  src={MobileImg3}
                  alt="Mobile timer"
                  style={{ height: "auto", width: "100%" }}
                ></Image>
              </div>
            </div>
          </div>
        </section>
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
