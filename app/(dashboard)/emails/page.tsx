// app/emails/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EmailsPage() {
  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Snoozed Emails</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-600 dark:text-gray-300">
          <p>This page will list all the emails you've snoozed.</p>
        </CardContent>
      </Card>

      {/* Example Placeholder Card */}
      <Card className="bg-sky-50 dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Email from support@example.com</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-200">Reminder set for: May 3rd, 2025 at 10:00 AM</p>
        </CardContent>
      </Card>
    </div>
  )
}
