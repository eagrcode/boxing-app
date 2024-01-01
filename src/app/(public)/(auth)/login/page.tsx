import styles from "./page.module.scss";
import SignInForm from "@/src/components/forms/SignInForm/SignInForm";
import { getSupaUser } from "@/src/lib/utils/getSupaUser";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getSupaUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className={styles.wrapper}>
      <SignInForm />
    </div>
  );
}
