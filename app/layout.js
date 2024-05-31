import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./_components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Frontend CMS",
  description: "This is frontend for the CMS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <Header />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
