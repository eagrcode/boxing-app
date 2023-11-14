import styles from "./page.module.scss";
import Logo from "@/src/components/shared/Logo/Logo";

export default function SuccessPage() {
  return (
    <div className={styles.pageWrapper}>
      <Logo variant={"home"} />
      <div className={styles.textContainer}>
        <h1>Account Created!</h1>
        <p>
          Please click the link in the confirmation email to complete the sign-up process, then
          close this page.
        </p>
      </div>
    </div>
  );
}
