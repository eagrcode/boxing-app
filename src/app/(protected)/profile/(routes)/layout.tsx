import ProfileBanner from "@/src/components/profile/ProfileBanner/ProfileBanner";
import styles from "./layout.module.scss";
import getProfileData from "@/src/lib/services/profile/getProfileData";
import { getUser } from "@/src/lib/services/user/getUser";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  let userID: string = "";

  if (user) {
    userID = user.id;
  }

  const { workouts_count: workoutsCount, saved_workouts_count: savedWorkoutsCount } =
    await getProfileData(userID);

  return (
    <>
      <div className={styles.wrapper}>
        <ProfileBanner workoutsCount={workoutsCount} savedWorkoutsCount={savedWorkoutsCount} />
      </div>
      {children}
    </>
  );
}
