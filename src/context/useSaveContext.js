// "use client";

// import { createContext, useContext, useState, useEffect } from "react";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// const SavedContext = createContext();

// export const useSaveContext = () => useContext(SavedContext);

// export function SavedContextProvider({ children }) {
//   const [savedWorkouts, setSavedWorkouts] = useState([]);
//   const supabase = createClientComponentClient();

//   useEffect(() => {
//     // Fetch the initial state of the user_saved_workouts table
//     const fetchInitialState = async () => {
//       const { data, error } = await supabase.from("user_saved_workouts").select("*");

//       if (error) {
//         console.error(error.message);
//       } else {
//         setSavedWorkouts(data);
//       }
//     };

//     fetchInitialState();

//     const channel = supabase
//       .channel("realtime-saves")
//       .on(
//         "postgres_changes",
//         {
//           event: "*",
//           schema: "public",
//           table: "user_saved_workouts",
//         },
//         async (payload) => {
//           console.log(payload.eventType, payload);
//           fetchInitialState();
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   return <SavedContext.Provider value={{ savedWorkouts }}>{children}</SavedContext.Provider>;
// }
