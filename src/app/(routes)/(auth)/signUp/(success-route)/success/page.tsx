export const dynamic = "force-dynamic";

import styles from "./page.module.scss";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Logo from "@/src/components/ui/Logo/Logo";

export default async function SuccessPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session);

  // if (session?.user || !session) {
  //   redirect("/");
  // }

  return (
    <div className={styles.pageWrapper}>
      <Logo variant={"home"} />
      <div className={styles.textContainer}>
        <h1>Account Created!</h1>
        <p>
          Please click the link in the confirmation email to complete the sign-up process, then
          close this page.
        </p>
      </div>
    </div>
  );
}
