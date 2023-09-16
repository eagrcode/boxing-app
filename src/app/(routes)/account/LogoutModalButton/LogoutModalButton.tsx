"use client";

// styles
import styles from "./LogoutModalButton.module.scss";

// icons
import { TbLogout2 } from "react-icons/tb";

// context
import { useLogoutModalContext } from "../../../../context/LogoutModal.context";

export default function LogoutModalButton() {
  const { isModalOpen, setIsModalOpen } = useLogoutModalContext();

  console.log("Is modal open? ", isModalOpen);

  return (
    <button
      onClick={() => setIsModalOpen((prev: boolean) => !prev)}
      className={styles.logoutBtn}
    ></button>
  );
}
