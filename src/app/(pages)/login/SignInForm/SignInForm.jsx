// next
import Link from "next/link";

// styles
import styles from "./SignInForm.module.scss";

// components
import Button from "./Button";

// utils
import signInEmail from "@/src/lib/actions/signInEmail";

export default function SignInForm() {
  return (
    <div className={styles.formWrapper}>
      <h1>Welcome back</h1>
      <p style={{ color: "var(--accent-color-dark)" }}>Sign in to your account</p>
      <button>Guest User</button>
      <p>or</p>
      <form action={signInEmail} className={styles.form}>
        <div className={styles.inputRow}>
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="you@example.com" required />
        </div>
        <div className={styles.inputRow}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="••••••••" required />
        </div>
        <Button />
        {/* <button formAction="/auth/sign-up">Sign Up</button> */}
      </form>

      <p>
        Don't have an account? <Link href="/">Sign Up Now</Link>
      </p>
    </div>
  );
}
