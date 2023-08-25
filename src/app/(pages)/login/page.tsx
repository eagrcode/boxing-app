// styles
import styles from "./page.module.scss";

// comonents
import SignInForm from "./SignInForm/SignInForm";

import { redirect } from "next/navigation";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function LoginPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/account");
  }

  return (
    <div className={styles.wrapper}>
      <SignInForm />
    </div>
  );
}
