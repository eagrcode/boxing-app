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
  description: "Boxingapp",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // init supabase client
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body>
        <WorkoutModeProvider>
          <FightDataProvider>
            {/* <Navbar session={session} /> */}
            <div className="app-wrapper">
              <LeftSidebar />
              <main>{children}</main>
            </div>
          </FightDataProvider>
        </WorkoutModeProvider>
      </body>
    </html>
  );
}
