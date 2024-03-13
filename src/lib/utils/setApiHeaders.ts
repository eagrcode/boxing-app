import { cookies } from "next/headers";

export const setApiHeaders = (): Headers => {
  const supabaseToken = cookies().get("sb-qaohjtcwvtqnnmzvhzty-auth-token")?.value;
  const accessToken = supabaseToken ? JSON.parse(supabaseToken)[0] : "";

  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("apikey", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);
  headers.set("Authorization", "Bearer " + accessToken);

  return headers;
};
