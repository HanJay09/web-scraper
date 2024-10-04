'use client'

import { Button } from "@/components/ui/button"
import {  Zap, LogIn, UserPlus } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
<header className="px-4 lg:px-6 h-16 flex items-center fixed w-full backdrop-blur-md bg-white/30 dark:bg-gray-900/30 border-b border-gray-200 dark:border-gray-800 z-50">
        <Link className="flex items-center justify-center" href="/">
          <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">ScraperPro</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors" href="/features">
            Features
          </Link>
          <Link className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors" href="/about">
            About Us
          </Link>
          <Link className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors" href="/faq">
            FaQ
          </Link>
          <Link className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors" href="/contact">
            Contact
          </Link>
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            <LogIn className="mr-2 h-4 w-4" />
            Log In
          </Button>
          <Button size="sm" className="hidden sm:inline-flex">
            <UserPlus className="mr-2 h-4 w-4" />
            Sign Up
          </Button>
        </nav>
      </header>
  )
}