// styles
import styles from "./LogoutButton.module.scss";

export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <button className={styles.logoutButton}>Logout</button>
    </form>
  );
}
