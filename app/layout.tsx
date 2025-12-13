import type { Metadata } from "next";
import { Inter } from "next/font/google"; // <--- Using a standard Google font
import Link from "next/link";
import "./globals.css";

// Initialize the font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Day Diary",
  description: "A simple diary app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* We apply the font class here */}
      <body className={`${inter.className} antialiased max-w-2xl mx-auto p-6`}>
        
        {/* NAVBAR */}
        <nav className="flex gap-6 mb-8 border-b pb-4">
          <Link href="/" className="font-bold hover:text-blue-500">
            Home
          </Link>
          <Link href="/new" className="hover:text-blue-500">
            New Entry
          </Link>
          <Link href="/insights" className="hover:text-blue-500">
            Insights
          </Link>
        </nav>

        {/* PAGE CONTENT */}
        {children}
        
      </body>
    </html>
  );
}