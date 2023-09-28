export const dynamic = "force-dynamic";

// styles
import "@/src/styles/globals.scss";
import "@/src/styles/variables.css";

// components
import LeftSidebar from "@/src/components/ui/LeftSidebar/LeftSidebar";
import BottomNav from "@/src/components/ui/BottomNav/BottomNav";

// context
import { FightDataProvider } from "@/src/context/TimerData.context";
import { WorkoutModeProvider } from "@/src/context/WorkoutTimerData.context";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";
import { Roboto_Flex } from "next/font/google";

export const metadata = {
  title: "FightX    ",
  description:
    "A social media inspired Boxing focused workout application, designed to help beginners and experienced users alike improve their skillset by leveraging FightX' unique feature set, such as random combo generation.",
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
      </body>
    </html>
  );
}
