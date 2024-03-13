// styles
import styles from "./LogoutButton.module.scss";

// icons
import { TbLogout2 } from "react-icons/tb";

export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <button className={styles.logoutButton}>
        <TbLogout2 size={20} /> Logout
      </button>
    </form>
  );
}
