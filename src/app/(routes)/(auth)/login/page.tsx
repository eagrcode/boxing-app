export const dynamic = "force-dynamic";

import styles from "./page.module.scss";
import SignInForm from "@/src/components/forms/SignInForm/SignInForm";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function LoginPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className={styles.wrapper}>
      <SignInForm />
    </div>
  );
}
