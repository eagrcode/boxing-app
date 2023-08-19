// styles
import styles from "./page.module.scss";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <form action="/auth/sign-in" method="post" className={styles.form}>
        <button>Google</button>
        <button>Facebook</button>
        <p>or</p>
        <div className={styles.inputRow}>
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="you@example.com" required />
        </div>
        <div className={styles.inputRow}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="••••••••" required />
        </div>
        <button>Sign In</button>
        <button formAction="/auth/sign-up">Sign Up</button>
      </form>
    </div>
  );
}
