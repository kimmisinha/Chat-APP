import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextAuth - MongoDB",
  description: "NextAuth with MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
