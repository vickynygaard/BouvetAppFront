"use client"; // Ensures this is a client component

import type { Metadata } from "next";
import { Raleway, Inter } from "next/font/google";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Use both usePathname & useRouter
import { Home, Users, Trophy, User, ArrowLeft, Settings } from "lucide-react"; // Import icons
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
  const pathname = usePathname(); // Get current route
  const router = useRouter(); // Enables navigation control

  const handleGoBack = () => {
    // Define top-level pages that should always return to "/"
    const topLevelPages = ["/Teams", "/Leaderboard", "/Profile"];

    if (topLevelPages.includes(pathname)) {
      router.push("/"); // Go back to homepage if on a top-level page
    } else {
      const pathSegments = pathname.split("/").filter(Boolean);

      if (pathSegments.length > 1) {
        // Remove the last segment to go back to the previous section
        const parentPath = `/${pathSegments.slice(0, -1).join("/")}`;
        router.push(parentPath);
      } else {
        router.push("/"); // Fallback to homepage if something goes wrong
      }
    }
  };

  return (
    <html lang="en" className="h-full">
      <body className={`${raleway.variable} ${inter.variable} antialiased flex flex-col min-h-screen bg-custom m-0 p-0`}>

        {/* 🔹 Header with Go Back Button */}
        <header className="bg-navbar fixed top-0 left-0 w-full h-14 p-4 mx-auto rounded-b-lg flex items-center">
          {/* Show 'Go Back' button only if NOT on the homepage */}
          {pathname !== "/" && (
            <button 
              onClick={handleGoBack} 
              className="p-2 rounded-md transition"
            >
              <ArrowLeft size={24} className="text-icon"/>
            </button>
          )}
        </header>

        {/* 🔹 Main Content */}
        <main className="flex-1 w-full pt-16">{children}</main>

        {/* 🔹 Navigation Bar */}
        <nav className="bg-navbar fixed bottom-0 left-0 w-full h-14 p-4 flex justify-around rounded-t-lg">
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
