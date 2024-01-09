import "@/src/styles/globals.css";
import styles from "./layout.module.scss";
import "@/src/styles/variables.css";

import { Roboto_Flex } from "next/font/google";

export const metadata = {
  title: "Beatdown",
  description:
    "A social media inspired Boxing focused workout application, designed to help beginners and experienced users alike improve their skillset by leveraging Beatdown's' unique feature set, such as random combo generation.",
};

const RobotoFlex = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={RobotoFlex.className}>
      <body>
        <div className={styles.appWrapper}>
          <main className={styles.main}>{children}</main>
        </div>
      </body>
    </html>
  );
}
