"use client";
import React from "react";
import { HiOutlineHome, HiOutlineUsers } from "react-icons/hi";
import Link from "next/link";

import { FaConnectdevelop } from "react-icons/fa6";

import {
  MdOutlineLibraryBooks,
  MdOutlineHowToVote,
  MdOutlineHealthAndSafety,
} from "react-icons/md";
import Home from "@/components/ui/home-page";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const navLinks = [
    { name: "Home", icon: HiOutlineHome },
    { name: "Chat", icon: HiOutlineUsers },
    { name: "Vote", icon: MdOutlineHowToVote },
    { name: "Resources", icon: MdOutlineLibraryBooks },
    { name: "Health", icon: MdOutlineHealthAndSafety },
  ];

  const teams = ["Heroicons", "Tailwind Labs", "Workcation"];
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen flex-col md:flex-row relative bg-[#F0F4F8]">
      {!isSidebarOpen && (
        <button
          className="absolute top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <span className="sr-only">Toggle Sidebar</span>
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
            fixed inset-y-0 left-0 z-40 w-72 bg-[#0f172a] text-white p-4 transform transition-transform duration-300 ease-in-out
            md:relative md:translate-x-0 md:flex md:flex-col md:justify-between
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div>
          {/* Logo */}
          <div className="flex flex-row text-xl items-center font-bold mb-8 mt-4 space-x-2">
            <FaConnectdevelop className="w-7 h-7" />
            <div className="text-2xl">PiConnect</div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navLinks.map(({ name, icon: Icon }) => (
              <Link
                key={name}
                href={`/${name.toLowerCase()}`} // e.g., /vote, /chat
                className="flex items-center gap-3 p-2 rounded-md hover:bg-[#1e293b] transition"
              >
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="border border-dashed border-gray-300 rounded-lg h-full w-full bg-[repeating-linear-gradient(45deg,#f3f4f6, #f3f4f6_10px,#fff_10px,#fff_20px)]">
          <div className="max-w-5xl mx-auto px-4 py-8">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
