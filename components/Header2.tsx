'use client';

import { Button } from "@/components/ui/button";
import { Zap, LogOut } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"; // Adjust import path based on your project structure
import { User as SupabaseUser } from "@supabase/supabase-js"; // Import User type from Supabase library

export function Header2() {
  const [user, setUser] = useState<SupabaseUser | null>(null); // Correctly typed state

  // Fetch the logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user); // This works because of the correct typing
      }
    };
    fetchUser();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null); // Reset user state
      window.location.href = "/"; // Redirect to home after logout
    }
  };

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center fixed w-full backdrop-blur-md bg-white/30 dark:bg-gray-900/30 border-b border-gray-200 dark:border-gray-800 z-50">
      <Link className="flex items-center justify-center" href="/dashboard">
        <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">ScraperPro</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
          href="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
          href="/about"
        >
          About Us
        </Link>
        <Link
          className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
          href="/faq"
        >
          FAQ
        </Link>
        <Link
          className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
          href="/contact"
        >
          Contact
        </Link>

        {user ? (
          <>
            <Button size="sm" className="hidden sm:inline-flex" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </>
        ) : (
          <>

          </>
        )}
      </nav>
    </header>
  );
}
