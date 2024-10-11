'use client'

import { Zap } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full py-6 px-4 md:px-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
    <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
      <div className="flex items-center space-x-2">
        <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        <span className="text-sm font-medium text-gray-900 dark:text-white">ScraperPro</span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 sm:mt-0">
        © 2024 ScraperPro. All rights reserved.
      </p>
      <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
        <Link className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors" href="/terms">
          Terms
        </Link>
        <Link className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors" href="/policy">
          Privacy Policy
        </Link>
      </nav>
    </div>
  </footer>
  )
}