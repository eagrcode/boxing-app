import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";
import MobImg1 from "@/public/assets/images/bd-m-discover.png";
import MobImg2 from "@/public/assets/images/bd-m-profile.png";
import MobImg3 from "@/public/assets/images/bd-m-timer.png";
import DesktopImg1 from "@/public/assets/images/bd-dashboard.png";
import DesktopImg2 from "@/public/assets/images/bd-discover.png";
import DesktopImg3 from "@/public/assets/images/bd-timer.png";
import DesktopImg4 from "@/public/assets/images/bd-acg.png";
import HeroBoxer1 from "@/public/assets/images/hero-boxer-1.png";

export default function Index() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <h1 className={styles.title}>BEATDOWN</h1>
          <p>
            Unlock your full potential, connect with fellow boxing enthusiasts, and take your
            fitness journey to the next level with Beatdown. Join our community of fighters today!
          </p>
          <div className={styles.btnContainer}>
            <Link href="/login">
              <button className="btnPrimary">Get Started</button>
            </Link>
            <a href="#features">
              <button className="btnSecondary">Explore</button>
            </a>
          </div>
        </div>

        <div className={styles.heroRight}>
          <Image
            src={HeroBoxer1}
            alt="Mobile timer"
            style={{ height: "auto", width: "100%" }}
          ></Image>
        </div>
      </div>

      <div className={styles.featuresWrapper} id="features">
        <div className={styles.featureContainer}>
          <div className={styles.featureCard}>
            <div className={styles.featureContent}>
              <h2>Get Sweaty</h2>
              <p>
                Our app's primary feature is an powerful interval timer, helping you optimise your
                training sessions. Whether you're into high-intensity interval training or just need
                a structured workout routine, Beatdown has got you covered.
              </p>
            </div>
            <div className={styles.featureImg}>
              <Image
                src={DesktopImg3}
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
                Join a thriving community of boxing enthusiasts who share your passion for the sweet
                science. Upload your own workouts, discover routines from fellow users, and interact
                with like-minded individuals. It's never been easier to find motivation and
                inspiration to keep pushing your limits.
              </p>
            </div>
            <div className={styles.featureImg}>
              <Image
                src={DesktopImg2}
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
                New to boxing or just looking for some guidance? Beatdown offers an automatic combo
                generation mode that provides you with ready-made combinations to follow during your
                workouts. It's the perfect feature for beginners and anyone who wants a helping hand
                in the ring.
              </p>
            </div>
            <div className={styles.featureImg}>
              <Image
                src={DesktopImg4}
                alt="Mobile timer"
                style={{ height: "auto", width: "100%" }}
              ></Image>
            </div>
          </div>
          <div className={`${styles.featureCard} ${styles.rightAlignText}`}>
            <div className={`${styles.featureContent} ${styles.rightAlignText}`}>
              <h2>Crush Your Goals</h2>
              <p>
                Our app's primary feature is an powerful interval timer, helping you optimise your
                training sessions. Whether you're into high-intensity interval training or just need
                a structured workout routine, Beatdown has got you covered.
              </p>
            </div>
            <div className={styles.featureImg}>
              <Image
                src={DesktopImg1}
                alt="Mobile timer"
                style={{ height: "auto", width: "100%" }}
                quality={100}
                unoptimized
              ></Image>
            </div>
          </div>
        </div>
      </div>
      <section className={styles.mobileFeaturesWrapper}>
        <div className={styles.mobileFeaturesContainer}>
          <h2>Fully Mobile Responsive</h2>
          <p>When in the Gym, you're primary use will be on mobile devices</p>
          <div className={styles.mobileImagesContainer}>
            <div className={styles.featureImg}>
              <Image
                src={MobImg1}
                alt="Mobile timer"
                style={{ height: "auto", width: "100%" }}
              ></Image>
            </div>
            <div className={styles.featureImg}>
              <Image
                src={MobImg2}
                alt="Mobile timer"
                style={{ height: "auto", width: "100%" }}
              ></Image>
            </div>
            <div className={styles.featureImg}>
              <Image
                src={MobImg3}
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
