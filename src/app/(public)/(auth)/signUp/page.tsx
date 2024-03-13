import styles from "./page.module.scss";
import SignUpForm from "@/src/components/forms/SignUpForm/SignUpForm";

export default function SignUpPage() {
  return (
    <div className={styles.wrapper}>
      <SignUpForm />
    </div>
  );
}
