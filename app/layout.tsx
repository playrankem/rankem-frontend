import type { Metadata } from "next";
import ThemeRegistry from "./ThemeRegistry";
import Providers from "./providers";           // ✅ new
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "AP Poll Guess",
  description: "Predict the AP Top 25",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Providers>                      {/* ✅ theme stays on the client */}
            <Header />
            {children}
          </Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}
