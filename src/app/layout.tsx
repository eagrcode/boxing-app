// styles
import "./globals.css";
import "./variables.css";

// components
import Navbar from "@/src/components/Navbar/Navbar";
import LeftSidebar from "@/src/components/LeftSidebar/LeftSidebar";

// context
import { FightDataProvider } from "@/src/context/useFightData";
import { WorkoutModeProvider } from "@/src/context/useWorkoutMode";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";
import { Roboto_Flex } from "next/font/google";

export const metadata = {
  title: "RoundX",
  description: "Boxing-app",
};

const RobotoFlex = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // init supabase client
  const supabase = createServerComponentClient({ cookies });

  // get user data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={RobotoFlex.className}>
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
