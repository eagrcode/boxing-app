import "./globals.css";

// components
import Navbar from "@/src/components/Navbar/Navbar";

// context
import { FightDataProvider } from "@/src/context/useFightData";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";

export const metadata = {
  title: "Supabang",
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
        <FightDataProvider>
          <Navbar session={session} />
          <main>{children}</main>
        </FightDataProvider>
      </body>
    </html>
  );
}
