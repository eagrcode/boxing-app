"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./SignInForm.module.scss";
import SubmitEmailButton from "./SubmitEmailButton";
import SubmitGuestButton from "./SubmitGuestButton";
import SubmitGoogleButton from "./SubmitGoogleButton";
import signInEmail from "@/src/lib/auth/signInEmail";
import signInGuest from "@/src/lib/auth/signInGuest";
import signInGoogle from "@/src/lib/auth/signInGoogle";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInEmailSchema = z.object({
  email: z.string().email("Please use a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type TypeSignInSchema = z.infer<typeof signInEmailSchema>;

export default function SignInForm() {
  // init state
  const [isLoadingGuest, setIsLoadingGuest] = useState<boolean>(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // init hooks
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TypeSignInSchema>({
    resolver: zodResolver(signInEmailSchema),
  });

  // email log in
  async function handleEmailSubmit(data: TypeSignInSchema) {
    const { email, password } = data;
    const errorRes = await signInEmail(email, password);

    if (errorRes) {
      if (errorRes.errorType === "auth") {
        console.log(errorRes.error.message);
        setErrorMsg(errorRes.error.message);
      } else if (errorRes.errorType === "unexpected") {
        console.log(errorRes.error.message);
        setErrorMsg(errorRes.error.message);
      }
    }

    router.refresh();
  }

  // guest log in
  async function handleGuestSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setIsLoadingGuest(true);
    await signInGuest();
    router.refresh();
  }

  // google log in
  async function handleGoogleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setIsLoadingGoogle(true);
    await signInGoogle();
    router.refresh();
  }

  return (
    <div className={styles.formWrapper}>
      <h1>Welcome back</h1>
      <p style={{ color: "var(--text-color-main)" }}>Sign in to your account</p>

      <form onSubmit={(e) => handleGuestSubmit(e)} className={styles.form}>
        <SubmitGuestButton isLoadingGuest={isLoadingGuest} />
      </form>

      <form onSubmit={(e) => handleGoogleSubmit(e)} className={styles.form}>
        <SubmitGoogleButton isLoadingGoogle={isLoadingGoogle} />
      </form>

      <p>or</p>

      <form onSubmit={handleSubmit(handleEmailSubmit)} className={styles.form}>
        <div className={styles.inputRow}>
          <label htmlFor="email">Email</label>
          <input {...register("email")} name="email" placeholder="you@example.com" />
        </div>
        <div className={styles.inputRow}>
          <label htmlFor="password">Password</label>
          <input {...register("password")} name="password" placeholder="••••••••" type="password" />
        </div>
        <SubmitEmailButton isSubmitting={isSubmitting} />
      </form>
      {errors.email && (
        <p style={{ color: "var(--accent-color-red)" }}>{`${errors.email.message}`}</p>
      )}
      {errors.password && (
        <p style={{ color: "var(--accent-color-red)" }}>{`${errors.password.message}`}</p>
      )}
      {errorMsg && <p style={{ color: "var(--accent-color-red)" }}>{errorMsg}</p>}

      <p>
        Don't have an account? <Link href="/signUp">Sign Up Now</Link>
      </p>
    </div>
  );
}
