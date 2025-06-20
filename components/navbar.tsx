'use client'

import { Menu, Mail, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useUser, useClerk, UserButton } from '@clerk/nextjs'
import useDarkMode from '@/hooks/useDarkMode'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const { theme, toggleTheme } = useDarkMode()
  const pathname = usePathname()

  const isHome = pathname === '/'

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-sky-700 dark:text-sky-300 text-xl font-bold flex items-center gap-2">
          <Mail className="w-5 h-5" />
          SnoozeMail
        </Link>

        {/* Nav Links - only show on homepage */}
        {isHome && (
          <div className="hidden md:flex items-center gap-6 text-sky-800 dark:text-sky-200 text-sm">
            <Link href="#how" className="hover:text-sky-600 dark:hover:text-sky-400">How it works</Link>
            <Link href="#features" className="hover:text-sky-600 dark:hover:text-sky-400">Features</Link>
            <Link href="/signup" className="hover:text-sky-600 dark:hover:text-sky-400">Try Now</Link>
          </div>
        )}

        {/* Right Side Auth + Actions */}
        <div className="hidden md:flex items-center gap-6 text-sky-800 dark:text-sky-200 text-sm">
          {!isLoaded ? (
            <div>Loading...</div>
          ) : user ? (
            <>
              <span className="text-sky-600 dark:text-sky-300">{user.firstName}</span>
              <UserButton />
			  {/* Dashboard/Home Button */}
          <Button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg">
            <Link href={isHome ? '/dashboard' : '/'}>
              {isHome ? 'Dashboard' : 'Home'}
            </Link>
          </Button>
            </>
          ) : (
            <Button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg">
              <Link href="/login">Sign In</Link>
            </Button>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="text-xl p-2 text-sky-800 dark:text-sky-200 hover:text-sky-600 dark:hover:text-sky-400 transition"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden text-sky-800 dark:text-sky-200">
          <Menu className="w-6 h-6" />
        </button>
      </nav>
    </header>
  )
}
