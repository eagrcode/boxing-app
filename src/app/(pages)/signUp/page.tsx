// styles
import styles from "./page.module.scss";

// comonents
import SignUpForm from "@/src/components/forms/SignUpForm/SignUpForm";

// next
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// supabase
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function SignUpPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className={styles.wrapper}>
      <SignUpForm />
    </div>
  );
}
