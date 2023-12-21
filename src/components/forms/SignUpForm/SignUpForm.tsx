"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import styles from "./SignUpForm.module.scss";
import Button from "./Button";
import signUpEmail from "@/src/lib/auth/signUpEmail";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  username: z.string().min(3, "Minimum 3 characters"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Minimum 6 characters"),
});

type TypeSignUpSchema = z.infer<typeof signInSchema>;

export default function SignUpForm() {
  // init state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // init hooks
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TypeSignUpSchema>({
    resolver: zodResolver(signInSchema),
  });

  // handle user sign up
  async function handleSignUp(data: TypeSignUpSchema) {
    const { email, password, username, fullName } = data;
    const res = await signUpEmail(email, password, username, fullName);

    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      router.push("/signUp/success");
    }

    console.log(res);
  }

  return (
    <div className={styles.formWrapper}>
      <h1>Get Started</h1>
      <p style={{ color: "var(--text-color-main)" }}>Create a new account</p>

      <form onSubmit={handleSubmit(handleSignUp)} className={styles.form}>
        <div className={styles.inputRow}>
          <div className={styles.labelContainer}>
            <label htmlFor="fullName">Full Name</label>
            {errors.fullName && <p className={styles.errorMsg}>{`${errors.fullName.message}`}</p>}
          </div>
          <input
            className={`${errors.fullName && styles.error}`}
            {...register("fullName")}
            name="fullName"
            placeholder="John Doe"
          />
        </div>
        <div className={styles.inputRow}>
          <div className={styles.labelContainer}>
            <label htmlFor="username">Username</label>
            {errors.username && <p className={styles.errorMsg}>{`${errors.username.message}`}</p>}
          </div>
          <input
            className={`${errors.username && styles.error}`}
            {...register("username")}
            name="username"
            placeholder="superuser123"
          />
        </div>
        <div className={styles.inputRow}>
          <div className={styles.labelContainer}>
            <label htmlFor="email">Email</label>
            {errors.email && <p className={styles.errorMsg}>{`${errors.email.message}`}</p>}
          </div>
          <input
            className={`${errors.email && styles.error}`}
            {...register("email")}
            name="email"
            placeholder="you@example.com"
          />
        </div>
        <div className={styles.inputRow}>
          <div className={styles.labelContainer}>
            <label htmlFor="password">Password</label>
            {errors.password && <p className={styles.errorMsg}>{`${errors.password.message}`}</p>}
          </div>

          <input
            className={`${errors.password && styles.error}`}
            {...register("password")}
            name="password"
            placeholder="••••••••"
            type="password"
          />
        </div>
        <Button isSubmitting={isSubmitting} />
      </form>

      {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}

      <p>
        Already have an account? <Link href="/login">Log In Now</Link>
      </p>
    </div>
  );
}
