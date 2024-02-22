import styles from "./LogoutButton.module.scss";
import { TbLogout2 } from "react-icons/tb";
import signOut from "@/src/lib/auth/signOut";

export default function LogoutButton() {
  return (
    <form action={signOut}>
      <button className={styles.logoutButton}>
        <TbLogout2 size={20} /> Logout
      </button>
    </form>
  );
}
