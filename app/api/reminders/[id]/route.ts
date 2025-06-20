// File: pages/api/reminders/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/db"; // make sure to replace with your DB connection logic
import Reminder from "@/lib/model/reminder"; // replace with your actual Mongoose model

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  await connectDB();

  try {
    switch (req.method) {
      case "PUT": {
        const updated = await Reminder.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: "Reminder not found" });
        return res.status(200).json(updated);
      }

      case "DELETE": {
        const deleted = await Reminder.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: "Reminder not found" });
        return res.status(200).json({ message: "Deleted successfully" });
      }

      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
