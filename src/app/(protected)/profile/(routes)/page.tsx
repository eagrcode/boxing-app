import { getUser } from "@/src/lib/services/user/getUser";
import styles from "./page.module.scss";
import UserWorkoutList from "@/src/components/profile/UserWorkoutList/UserWorkoutList";

export default async function AccountPage() {
  const user = await getUser();

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
