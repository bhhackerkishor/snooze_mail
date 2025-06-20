'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import axios from "axios";

type Props = {
  currentPlan: string; // "free" | "pro" | "team"
};

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export default function ClientSubscription({ currentPlan }: Props) {
  const plans = [
    {
      name: "Free Plan",
      planKey: "free",
      price: "₹0",
      description: "Perfect for getting started with basic features.",
      features: [
        "10 Reminder / month",
        "Email notifications",
        "Basic support",
      ],
      buttonLabel: "default",
      buttonVariant: "outline",
    },
    {
      name: "Pro Plan",
      planKey: "pro",
      price: "₹199 / month",
      description: "Ideal for individuals with moderate usage.",
      features: [
        "100 Reminders / month",
        "Priority email support",
        "Custom reminder intervals",
      ],
      buttonLabel: "Upgrade to Pro",
      buttonVariant: "default",
    },
    {
      name: "Team Plan",
      planKey: "team",
      price: "₹499 / month",
      description: "For teams and power users with unlimited needs.",
      features: [
        "Unlimited Reminders",
        "Team collaboration tools",
        "Premium support",
      ],
      buttonLabel: "Upgrade to Team",
      buttonVariant: "default",
    },
  ];

  const handleSubscription = async (planKey: string) => {
    try {
      // Load Razorpay script
      await loadRazorpayScript();
      
      // Create order on your server
      const response = await axios.post('/api/payment/checkout', {
        plan: planKey,
        amount: planKey === 'pro' ? 19900 : 49900, // amount in paise
        currency: 'INR'
      });

      const { orderId, amount, currency } = response.data;

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: amount.toString(),
        currency: INR,
        name: "Your Company Name",
        description: `${planKey} Plan Subscription`,
        order_id: orderId,
        handler: async function (response: any) {
          // Verify payment on your server
          const verificationResponse = await axios.post('/api/payment/verify', {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            plan: planKey
          });

          if (verificationResponse.data.success) {
            // Payment successful
            alert('Payment successful! Plan upgraded.');
            // You might want to refresh the page or update the UI here
            window.location.reload();
          } else {
            // Payment verification failed
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: "Customer Name", // You might want to get this from user profile
          email: "customer@example.com", // Get from user profile
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan, index) => {
        const isCurrent = plan.planKey === currentPlan;

        return (
          <Card
            key={index}
            className={`border ${
              isCurrent ? 'border-sky-500 dark:border-sky-400' : 'border-gray-200 dark:border-gray-700'
            } shadow-md hover:shadow-lg transition`}
          >
            <CardHeader>
              <CardTitle className="text-xl text-sky-700 dark:text-sky-300">
                {plan.name}
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{plan.price}</p>
            </CardHeader>
            <CardContent>
              <ul className="mb-4 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
				  className={`w-full ${
					isCurrent
					  ? "border border-sky-500 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900"
					  : "bg-sky-500 hover:bg-sky-600 text-white"
				  }`}
				  variant={isCurrent ? "outline" : "default"}
				  disabled={isCurrent || (plan.planKey === "free" && currentPlan !== "free")}
				  onClick={() =>
					!(isCurrent || (plan.planKey === "free" && currentPlan !== "free")) &&
					handleSubscription(plan.planKey)
				  }
				>
				  {isCurrent
					? "Current Plan"
					: plan.planKey === "free" && currentPlan !== "free"
					? "Already Subscribed"
					: plan.buttonLabel}
				</Button>

            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}