import "./globals.css";
import "./variables.css";

// components
import Navbar from "@/src/components/Navbar/Navbar";
import LeftSidebar from "@/src/components/LeftSidebar/LeftSidebar";

// context
import { FightDataProvider } from "@/src/context/useFightData";
import { WorkoutModeProvider } from "../context/useWorkoutMode";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";

export const metadata = {
  title: "RoundX",
  description: "Boxing-app",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // init supabase client
  const supabase = createServerComponentClient({ cookies });

  // get user data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body>
        <WorkoutModeProvider>
          <FightDataProvider>
            {/* <Navbar session={session} /> */}
            {user ? (
              <div className="app-wrapper-user">
                <LeftSidebar />
                <main>{children}</main>
              </div>
            ) : (
              <div className="app-wrapper">
                <main>{children}</main>
              </div>
            )}
          </FightDataProvider>
        </WorkoutModeProvider>
      </body>
    </html>
  );
}
