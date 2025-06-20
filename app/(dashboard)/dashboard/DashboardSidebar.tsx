"use client"
import React from "react"
import Link from "next/link"
import { UserButton ,useClerk } from "@clerk/nextjs"
import {
  Home,
  Bell,
  Clock,
  Mail,
  DollarSign,
  Settings,
  User,
  LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
  { href: "/reminders", label: "Reminders", icon: <Bell className="w-5 h-5" /> },
  { href: "/emails", label: "Snoozed Emails", icon: <Mail className="w-5 h-5" /> },
  { href: "/subscription", label: "Subscription", icon: <DollarSign className="w-5 h-5" /> },
  { href: "/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
]

const DashboardSidebar = () => {
const { user,signOut } = useClerk();
  return (
    <aside className="fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-900 border-r flex flex-col justify-between p-4 shadow-sm z-40">
 <div>
        {/* Navigation */}
        <nav className="space-y-2 mt-20">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:bg-sky-100 dark:hover:bg-sky-800 px-4 py-2 rounded-md transition"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* User Button */}
      <div className="mt-6">
          {user ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-12 h-12",
                    },
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">
                    {user.fullName}
                  </span>
                  <span className="text-xs text-gray-400 truncate">
                    {user.primaryEmailAddress?.emailAddress}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  signOut();
                 
                }}
                className="w-full flex items-center gap-2 text-red-500 hover:bg-red-500/10 border-red-500/30"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          ) : (
            <div className="text-sm text-gray-500">Not signed in</div>
          )}
        </div>
    </aside>
  )
}

export default DashboardSidebar
