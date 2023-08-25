// styles
import styles from "./SignInForm.module.scss";

export default function SignInForm() {
  return (
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
  );
}
