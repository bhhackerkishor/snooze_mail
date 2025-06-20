'use client'

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Calendar, Edit, Trash, CalendarDays, Clock, Mail, Pencil, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Reminder {
  _id: string
  subject: string
  to: string
  remindAt: string
  sent: string
  clerkId: string
  body?: string
}

export default function RemindersClient({ reminders: initialReminders }: { reminders: Reminder[] }) {
  const [showForm, setShowForm] = useState(false)
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const [form, setForm] = useState<any>({
    clerkId: initialReminders[0]?.clerkId || "",
    to: "",
    subject: "",
    body: "",
    html: "",
    remindAt: "",
  })

  const fetchReminders = async () => {
    const res = await fetch("/api/reminders")
    const data = await res.json()
    setReminders(data)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (initialReminders[0]) {
      setForm((prev) => ({ ...prev, clerkId: initialReminders[0].clerkId }))
    }
  }, [initialReminders])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const err = await res.json()
        return alert("Error: " + err.error)
      }

      setShowForm(false)
      fetchReminders()
    } catch (err) {
      console.error("Submit error:", err)
      alert("Something went wrong")
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch(`/api/reminders/${form._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: form.title,
          to: form.email,
          remindAt: form.time,
          body: form.notes,
          html: form.notes,
          clerkId: form.clerkId,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        return alert("Error: " + err.error)
      }

      setShowForm(false)
      fetchReminders()
    } catch (err) {
      console.error("Update error:", err)
      alert("Something went wrong")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reminder?")) return

    try {
      const res = await fetch(`/api/reminders/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const err = await res.json()
        return alert("Error deleting reminder: " + err.error)
      }

      fetchReminders()
    } catch (err) {
      console.error("Delete error:", err)
    }
  }

  const filteredReminders = reminders.filter((reminder) => {
    const matchesSearch =
      reminder.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reminder.to.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "pending" && reminder.sent === "false") ||
      (filterStatus === "sent" && reminder.sent !== "false")

    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Bell className="w-6 h-6" />
          Reminders
        </h1>
        <Button variant="default" onClick={() => setShowForm(true)}>Create New Reminder</Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <Input
          type="text"
          placeholder="Search reminders..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select onValueChange={(val) => setFilterStatus(val)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="text-left p-3">Title</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Time</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReminders.map((reminder) => (
                  <tr key={reminder._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
                    <td className="p-3 font-medium">
                      {(() => {
                        const match = reminder.subject?.match(/^Fwd: snooze in (\d+ (minutes|minute|hours|hour|days|day))/i)
                        const duration = match ? match[1] : null
                        let cleanedSubject = reminder.subject.replace(/^Fwd: snooze in \d+ (minutes|minute|hours|hour|days|day)/i, '')
                        cleanedSubject = cleanedSubject.replace(/^[^\w]+/, '')
                        return (<>{duration && <span className="text-xs text-gray-500 mr-2">({duration})</span>}{cleanedSubject}</>)
                      })()}
                    </td>
                    <td className="p-3">{reminder.to}</td>
                    <td className="p-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(reminder.remindAt).toLocaleString()}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${reminder.sent === "false" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                        {reminder.sent === "false" ? "Pending" : "Sent"}
                      </span>
                    </td>
                    <td className="p-3 space-x-2">
                      <Button size="icon" variant="ghost" onClick={() => {
                        setForm({
                          _id: reminder._id,
                          clerkId: reminder.clerkId,
                          title: reminder.subject,
                          email: reminder.to,
                          time: reminder.remindAt.slice(0, 16),
                          notes: reminder.body || "",
                        })
                        setShowForm(true)
                      }}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(reminder._id)}>
                        <Trash className="w-4 h-4 text-red-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="relative w-full max-w-lg mx-auto">
            <Card className="bg-white dark:bg-black border border-sky-200 dark:border-sky-800 shadow-lg z-50">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-sky-600 dark:text-sky-400 flex items-center gap-2">
                  <Pencil className="w-5 h-5" />
                  Create Reminder
                </CardTitle>
                <Button
                  variant="ghost"
                  className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                  size="icon"
                  onClick={() => setShowForm(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => form._id ? handleEdit(e) : handleSubmit(e)} className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="text-sky-700 dark:text-sky-300">Title</Label>
                    <Input name="title" value={form.title} onChange={handleChange} placeholder="Meeting" required />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sky-700 dark:text-sky-300 flex items-center gap-1">
                      <Mail className="w-4 h-4" /> Send To
                    </Label>
                    <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="time" className="text-sm font-medium text-sky-700 dark:text-sky-300 flex items-center gap-1 mb-1">
                      <Clock className="w-4 h-4" /> Reminder Time
                    </Label>
                    <input
                      name="time"
                      type="datetime-local"
                      value={form.time}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().slice(0, 16)}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes" className="text-sky-700 dark:text-sky-300">Notes (optional)</Label>
                    <Textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Optional details..." className="text-xs" />
                  </div>
                  <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white">Create Reminder</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
