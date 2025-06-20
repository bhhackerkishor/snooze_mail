"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "next-themes";

interface Reminder {
  _id: string
  subject: string
  to: string
  remindAt: string
  sent: string
  clerkId: string
  body?: string
}



 


export default function Dashboard({ user ,initialReminders }) {
  const { name, usedRemindersThisMonth, plan } = user;
  const reminderLimit = plan === "free" ? 10 : plan === "pro" ? 100 : Infinity;
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders)
  const progress =
    reminderLimit === Infinity
      ? 100
      : Math.min((usedRemindersThisMonth / reminderLimit) * 100, 100);
	  
	 // Your fetched list

const now = new Date();

const dueReminders = reminders.filter(reminder => {
  const remindAt = new Date(reminder.remindAt);
  return remindAt <= now; // Already due
});

const dueCount = dueReminders.length;




  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-6 md:px-16">
      <h1 className="text-3xl font-bold mb-6">🏠 Dashboard</h1>
      <p className="text-lg mb-10">Welcome back, <span className="font-semibold">{name}</span> 👋</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader><CardTitle>Total Reminders</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{usedRemindersThisMonth}</p></CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Active Reminders</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{dueCount}</p></CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Snoozed Emails</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">P{usedRemindersThisMonth-dueCount}</p></CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader><CardTitle>Plan Usage</CardTitle></CardHeader>
          <CardContent>
            <p className="mb-2 text-sm">{usedRemindersThisMonth} of {reminderLimit === Infinity ? "∞" : reminderLimit} reminders used</p>
            <Progress value={progress} />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="w-full sm:w-auto">➕ Create Reminder</Button>
        <Button variant="outline" className="w-full sm:w-auto">🚀 Upgrade Plan</Button>
      </div>
    </div>
  );
}
