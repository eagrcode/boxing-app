// styles
import styles from "./page.module.scss";

// comonents
import SignUpForm from "./SignUpForm/SignUpForm";

// next
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// supabase
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";

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
