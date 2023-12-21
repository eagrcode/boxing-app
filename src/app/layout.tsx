import "@/src/styles/normalize.css";
import "@/src/styles/globals.scss";
import "@/src/styles/variables.css";
import { FightDataProvider } from "@/src/context/TimerData.context";
import { WorkoutModeProvider } from "@/src/context/WorkoutTimerData.context";
import { Roboto_Flex } from "next/font/google";
import BottomNav from "../components/navigation/BottomNav/BottomNav";
import LeftSidebar from "../components/navigation/LeftSidebar/LeftSidebar";
import Topbar from "../components/shared/Topbar/Topbar";
import { getSupaUser } from "../lib/utils/getSupaUser";
import StoreProvider from "../redux/StoreProvider";

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
  const user = await getSupaUser();

  console.log("LAYOUT: ", user);

  let userID = "";
  let fullName = "";
  let email = "";
  let avatarURL = "";

  if (user) {
    userID = user.id;
    fullName = user.user_metadata.full_name;
    email = user.user_metadata.email;
    avatarURL = user.user_metadata.avatar_url;
  }

  if (user)
    return (
      <StoreProvider>
        <WorkoutModeProvider>
          <FightDataProvider>
            <html lang="en" className={RobotoFlex.className}>
              <body>
                <div className="app-wrapper-user">
                  <Topbar userID={userID} fullName={fullName} email={email} avatarURL={avatarURL} />
                  <div className="mid-app-wrapper">
                    <LeftSidebar />
                    <main className="main-user">{children}</main>
                  </div>
                  <BottomNav />
                </div>
              </body>
            </html>
          </FightDataProvider>
        </WorkoutModeProvider>
      </StoreProvider>
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
