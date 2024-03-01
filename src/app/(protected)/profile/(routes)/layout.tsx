import ProfileBanner from "@/src/components/profile/ProfileBanner/ProfileBanner";
import styles from "./layout.module.scss";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.wrapper}>
        <ProfileBanner />
      </div>
      {children}
    </>
  );
}
