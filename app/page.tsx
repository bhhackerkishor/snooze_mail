import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlarmClock,
  SendHorizonal,
  CalendarCheck2,
  Briefcase,
  GraduationCap,
  Brain,
} from "lucide-react"
import FloatingShape from "@/components/FloatingShape"

export default function LandingPage() {
  return (
<main className="bg-white dark:bg-gray-950 text-sky-900 dark:text-sky-100 min-h-screen flex flex-col items-center justify-center px-4">
  {/* Hero Section */}
  <section className="relative text-center py-20 max-w-3xl mx-auto">
    {/* Blurry Background Shape - Sky Blue */}
    <div
      className="absolute -z-10 top-[-10rem] left-1/2 transform -translate-x-1/2 w-[55rem] aspect-[1020/880] blur-3xl opacity-40 pointer-events-none dark:hidden"
      style={{
        background: "linear-gradient(to right top, rgb(56, 189, 248), rgb(125, 211, 252))",
        clipPath: "polygon(80% 20%, 90% 55%, 50% 100%, 70% 30%, 20% 50%, 50% 0px)",
      }}
    ></div>

    <h1 className="text-5xl font-bold mb-4">Snooze Your Emails. Effortlessly.</h1>
    <p className="text-xl mb-6">
      Forward any email to{" "}
      <span className="font-mono bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-100 px-2 py-1 rounded">
        2min@snoozemail.app
      </span>{" "}
      and get reminded exactly when you want.
    </p>
    <Button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl text-lg shadow">
      Try It Now
    </Button>
  </section>

  {/* How It Works */}
  <section className="py-16 w-full max-w-5xl text-center">
    <h2 className="text-3xl font-semibold mb-8">How It Works</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        {
          icon: <SendHorizonal className="text-sky-600 dark:text-sky-400 w-8 h-8 mb-4 mx-auto" />,
          text: "Forward email to 2min@snoozemail.app",
        },
        {
          icon: <CalendarCheck2 className="text-sky-600 dark:text-sky-400 w-8 h-8 mb-4 mx-auto" />,
          text: "We schedule it using our smart backend",
        },
        {
          icon: <AlarmClock className="text-sky-600 dark:text-sky-400 w-8 h-8 mb-4 mx-auto" />,
          text: "You get reminded – right on time!",
        },
      ].map((step, idx) => (
        <Card key={idx} className="shadow-xl dark:bg-gray-900">
          <CardContent className="p-6 text-lg">
            {step.icon}
            {step.text}
          </CardContent>
        </Card>
      ))}
    </div>
  </section>

  {/* Features */}
  <section className="bg-sky-50 dark:bg-gray-900 py-16 w-full">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-3xl font-semibold mb-6">Why SnoozeMail?</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left px-4">
        {[
          "No signup needed",
          "Works with any email client",
          "Just forward like 2min, 3h, or tomorrow",
          "Secure & private – we never read your mail",
        ].map((feature, idx) => (
          <li key={idx} className="text-lg bg-white dark:bg-gray-800 p-4 rounded shadow">
            ✅ {feature}
          </li>
        ))}
      </ul>
    </div>
  </section>

  {/* Use Cases */}
  <section className="py-16 w-full max-w-4xl text-center">
    <h2 className="text-3xl font-semibold mb-6">Perfect For</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { icon: <Briefcase className="text-sky-600 dark:text-sky-400 w-8 h-8 mb-4 mx-auto" />, label: "Busy Professionals" },
        { icon: <GraduationCap className="text-sky-600 dark:text-sky-400 w-8 h-8 mb-4 mx-auto" />, label: "Students & Learners" },
        { icon: <Brain className="text-sky-600 dark:text-sky-400 w-8 h-8 mb-4 mx-auto" />, label: "Forgetful Minds" },
      ].map((item, idx) => (
        <Card key={idx} className="shadow-md dark:bg-gray-900">
          <CardContent className="p-6 text-lg">
            {item.icon}
            {item.label}
          </CardContent>
        </Card>
      ))}
    </div>
  </section>

  {/* Final CTA */}
  <section className="bg-sky-100 dark:bg-gray-800 py-16 w-full text-center">
    <h2 className="text-2xl font-semibold mb-4">Ready to try it out?</h2>
    <p className="mb-6 text-lg">
      Forward an email to{" "}
      <span className="font-mono text-sky-700 dark:text-sky-300">5min@snoozemail.app</span> now!
    </p>
    <Button className="bg-sky-700 hover:bg-sky-800 text-white px-6 py-3 rounded-xl text-lg shadow">
      Start Snoozing
    </Button>
  </section>

  {/* Footer */}
  <footer className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
    SnoozeMail © {new Date().getFullYear()} |{" "}
    <a href="#" className="underline">
      Privacy
    </a>{" "}
    |{" "}
    <a href="#" className="underline">
      Terms
    </a>
  </footer>
</main>

  )
}
