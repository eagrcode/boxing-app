import { cookies } from "next/headers";

export const setApiHeaders = (): Headers => {
  // Retrieve the token string from the cookie
  const supabaseTokenEntry = cookies().get(
    "sb-qaohjtcwvtqnnmzvhzty-auth-token.0" || "sb-qaohjtcwvtqnnmzvhzty-auth-token"
  );
  const supabaseToken = supabaseTokenEntry ? supabaseTokenEntry.value : "";
  console.log("SUPABASE TOKEN: ", supabaseToken);

  // Use a regular expression to extract the access_token from the string
  const accessTokenMatch = supabaseToken.match(/"access_token":"([^"]+)"/);
  const accessToken = accessTokenMatch ? accessTokenMatch[1] : "";
  console.log("ACCESS TOKEN: ", accessToken);

  // Set up headers
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("apikey", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);
  headers.set("Authorization", "Bearer " + accessToken);

  return headers;
};
