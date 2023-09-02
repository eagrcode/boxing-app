import { redirect } from "next/navigation";

export default async function signIn(formData: FormData) {
  try {
    await fetch(`${location.origin}/auth/sign-in`, {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    console.log(error);
  }
}
