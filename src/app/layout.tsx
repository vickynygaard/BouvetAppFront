import type { Metadata } from "next";
import { Raleway, Inter } from "next/font/google";
import Link from "next/link";
import { Home, Users, Trophy, User } from "lucide-react"; // Importing icons
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${raleway.variable} ${inter.variable} antialiased flex flex-col min-h-screen bg-custom m-0 p-0`}>

        {/* 🔹 Main Content */}
        <main className="flex-1 w-full">{children}</main>

        {/* 🔹 Bottom Navigation Bar with Icons */}
        <nav className="bg-navbar fixed bottom-0 left-0 w-full shadow-md p-4 flex justify-around border-t border-gray-300 dark:border-gray-700">
          <NavItem href="/" icon={<Home size={24} className="text-icon" />} />
          <NavItem href="/Teams" icon={<Users size={24} className="text-icon" />} />
          <NavItem href="/Leaderboard" icon={<Trophy size={24} className="text-icon" />} />
          <NavItem href="/Profile" icon={<User size={24} className="text-icon" />} />
        </nav>
        
      </body>
    </html>
  );
}

/* 🔹 Reusable Navigation Item Component */
const NavItem = ({ href, icon }: { href: string; icon: React.ReactNode }) => {
  return (
    <Link href={href} className="text-icon">
      {icon}
    </Link>
  );
};
