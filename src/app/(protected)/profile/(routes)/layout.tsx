import ProfileBanner from "@/src/components/profile/ProfileBanner/ProfileBanner";
import styles from "./layout.module.scss";
import { getUser } from "@/src/lib/services/user/getUser";
import getProfileWorkoutCounts from "@/src/lib/services/profile/getProfileWorkoutCounts";
import getProfile from "@/src/lib/services/profile/getProfile";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  let userID: string = "";

  if (user) {
    userID = user.id;
  }

  const { workouts_count: workoutsCount, saved_workouts_count: savedWorkoutsCount } =
    await getProfileWorkoutCounts();
  const { full_name: fullName, username: username } = await getProfile(userID);

  return (
    <>
      <div className={styles.wrapper}>
        <ProfileBanner
          fullName={fullName}
          username={username}
          workoutsCount={workoutsCount}
          savedWorkoutsCount={savedWorkoutsCount}
        />
      </div>
      {children}
    </>
  );
}
