// styles
import Logo from "@/src/components/ui/Logo/Logo";
import styles from "./page.module.scss";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SuccessPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session);

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.textContainer}>
        <h1>Account Created!</h1>
        <p>
          Please click the link in the confirmation email to complete the sign-up process, then
          close this page.
        </p>
        <p>
          Please note, the sign-up flow is currently not behaving as expected, once redirected upon
          clicking the confirmation link, you will be sent to the login page, proceed to sign in as
          usual with the account details you've just created.
        </p>
      </div>
    </div>
  );
}
