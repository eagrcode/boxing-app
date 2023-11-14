export const dynamic = "force-dynamic";

import "@/src/styles/normalize.css";
import "@/src/styles/globals.scss";
import "@/src/styles/variables.css";
import { FightDataProvider } from "@/src/context/TimerData.context";
import { WorkoutModeProvider } from "@/src/context/WorkoutTimerData.context";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Roboto_Flex } from "next/font/google";
import BottomNav from "../components/navigation/BottomNav/BottomNav";
import LeftSidebar from "../components/navigation/LeftSidebar/LeftSidebar";

export const metadata = {
  title: "Beatdown",
  description:
    "A social media inspired Boxing focused workout application, designed to help beginners and experienced users alike improve their skillset by leveraging Beatdown's' unique feature set, such as random combo generation.",
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

  console.log(user);

  if (user)
    return (
      <WorkoutModeProvider>
        <FightDataProvider>
          <html lang="en" className={RobotoFlex.className}>
            <body>
              <div className="app-wrapper-user">
                <LeftSidebar />
                <main className="main-user">{children}</main>
                <BottomNav />
              </div>
            </body>
          </html>
        </FightDataProvider>
      </WorkoutModeProvider>
    );

  return (
    <html lang="en" className={RobotoFlex.className}>
      <body>
        <div className="app-wrapper">
          <main className="main-no-user">{children}</main>
        </div>
      </body>
    </html>
  );
}
