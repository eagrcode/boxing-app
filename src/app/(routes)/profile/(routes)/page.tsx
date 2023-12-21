import { getSupaUser } from "@/src/lib/utils/getSupaUser";
import styles from "./page.module.scss";
import UserWorkoutList from "@/src/components/profile/UserWorkoutList/UserWorkoutList";

export default async function AccountPage() {
  const user = await getSupaUser();

  let userID = "";

  if (user) {
    userID = user.id;
  }

  return (
    <>
      <UserWorkoutList userID={userID} />
    </>
  );
}
