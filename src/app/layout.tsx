// styles
import "@/src/styles/globals.scss";
import "@/src/styles/variables.css";

// components
import LeftSidebar from "@/src/components/ui/LeftSidebar/LeftSidebar";
import BottomNav from "@/src/components/ui/BottomNav/BottomNav";

// context
import { FightDataProvider } from "@/src/context/TimerData.context";
import { WorkoutModeProvider } from "@/src/context/WorkoutTimerData.context";
import { LogoutModalContextProvider } from "@/src/context/LogoutModal.context";

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

export const dynamic = "force-dynamic";

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
        <LogoutModalContextProvider>
          <WorkoutModeProvider>
            <FightDataProvider>
              {user ? (
                <div className="app-wrapper-user">
                  <LeftSidebar />
                  <main className="main-user">{children}</main>
                  <BottomNav />
                </div>
              ) : (
                <div className="app-wrapper">
                  <main className="main-no-user">{children}</main>
                </div>
              )}
            </FightDataProvider>
          </WorkoutModeProvider>
        </LogoutModalContextProvider>
      </body>
    </html>
  );
}
