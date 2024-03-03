import "@/src/styles/globals.css";
import styles from "./layout.module.scss";
import "@/src/styles/variables.css";
import { FightDataProvider } from "@/src/context/TimerData.context";
import { WorkoutModeProvider } from "@/src/context/WorkoutTimerData.context";
import { Roboto_Flex } from "next/font/google";
import BottomNav from "../../components/navigation/BottomNav/BottomNav";
import LeftSidebar from "../../components/navigation/LeftSidebar/LeftSidebar";
import Topbar from "../../components/shared/Topbar/Topbar";
import StoreProvider from "../../redux/StoreProvider";
import { getUser } from "@/src/lib/services/user/getUser";
import { Suspense } from "react";

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
  const user = await getUser();

  let userID = "";
  let fullName = "";
  let email = "";
  let avatarURL = "";

  if (user) {
    userID = user.id;

    if (user.email === "guest@guest.com") {
      fullName = "Guest Smith";
      email = user.email;
      avatarURL = "";
    } else {
      fullName = user.user_metadata.full_name;
      email = user.user_metadata.email;
      avatarURL = user.user_metadata.avatar_url;
    }
  }

  return (
    <StoreProvider userID={userID} fullName={fullName} email={email} avatarURL={avatarURL}>
      <WorkoutModeProvider>
        <FightDataProvider>
          <html lang="en" className={RobotoFlex.className}>
            <body>
              <div className={styles.appWrapper}>
                <Suspense>
                  <Topbar />
                </Suspense>
                <div className={styles.midAppWrapper}>
                  <Suspense>
                    <LeftSidebar />
                  </Suspense>
                  <main className={styles.main}>{children}</main>
                </div>
                <Suspense>
                  <BottomNav />
                </Suspense>
              </div>
            </body>
          </html>
        </FightDataProvider>
      </WorkoutModeProvider>
    </StoreProvider>
  );
}
