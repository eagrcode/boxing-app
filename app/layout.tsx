import "./globals.css";

// components
import Navbar from "@/app/components/Navbar/Navbar";

// context
import { FightDataProvider } from "@/app/context/useFightData";

export const metadata = {
  title: "Supabang",
  description: "Boxingapp",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <FightDataProvider>
          <main>{children}</main>
          <Navbar />
        </FightDataProvider>
      </body>
    </html>
  );
}
