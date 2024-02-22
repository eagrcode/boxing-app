// "use server";

// import { apiRoutes } from "../../dbAPI/apiRoutes";
// import { setApiHeaders } from "../../utils/setApiHeaders";

// export const getUser = async () => {
//   try {
//     const headers = setApiHeaders();

//     const res = await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL + apiRoutes.getUser, {
//       headers: headers,
//       cache: "force-cache",
//     });

//     if (!res.ok) {
//       console.error("Error fetching user: ", res);
//     }

//     const data = await res.json();

//     console.log("GET USER: ", data);

//     return data;
//   } catch (error: any) {
//     console.error("Unexpected error: ", error.message);
//   }
// };

import { cookies } from "next/headers";
import { createClient } from "../../supabase/server";

export const getUser = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.log("Error retrieving user: ", error.message);
    }

    console.log("GET USER: ", data.user);
    return data.user;
  } catch (error: any) {
    console.log("Function error: ", error.message);
  }
};
