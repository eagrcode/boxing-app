// styles
import styles from "./page.module.scss";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session && session.user;

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <h1>Account</h1>
      <p>Email address: {user.email}</p>
    </>
  );
};

export default page;
