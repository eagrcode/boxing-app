import styles from "./page.module.scss";
import SignInForm from "@/src/components/forms/SignInForm/SignInForm";

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <SignInForm />
    </div>
  );
}
