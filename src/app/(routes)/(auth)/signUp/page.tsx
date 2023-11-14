export const dynamic = "force-dynamic";

import styles from "./page.module.scss";
import SignUpForm from "@/src/components/forms/SignUpForm/SignUpForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function SignUpPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className={styles.wrapper}>
      <SignUpForm />
    </div>
  );
}
