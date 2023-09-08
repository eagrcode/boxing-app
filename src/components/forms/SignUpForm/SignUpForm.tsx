"use client";

// next
import Link from "next/link";
import { useRouter } from "next/navigation";

// react
import { FormEvent, useState } from "react";

// styles
import styles from "./SignUpForm.module.scss";

// components
import Button from "./Button";

// utils
import signUpEmail from "@/src/lib/actions/signUpEmail";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SignUpForm() {
  // init state
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // init hooks
  const router = useRouter();

  // handle user sign up
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setIsLoading(true);
    await signUpEmail(email, password, username, firstName, lastName);
    setIsLoading(false);
    router.push("/signUp/success");
  }

  const supabase = createClientComponentClient();

  return (
    <div className={styles.formWrapper}>
      <h1>Get Started</h1>
      <p style={{ color: "var(--tetx-color-main)" }}>Create a new account</p>

      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <div className={styles.inputRow}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            required
          />
        </div>
        <div className={styles.inputRow}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            required
          />
        </div>
        <div className={styles.inputRow}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="superuser123"
            required
          />
        </div>
        <div className={styles.inputRow}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        <div className={styles.inputRow}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="••••••••"
            required
          />
        </div>
        <Button isLoading={isLoading} />
      </form>

      <p>
        Already have an account? <Link href="/login">Log In Now</Link>
      </p>
    </div>
  );
}
