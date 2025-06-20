import React from "react"
import DashboardSidebar from "./dashboard/DashboardSidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="flex-1 min-h-screen bg-gray-50 dark:bg-gray-950 p-6 ml-80">
	  

        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
