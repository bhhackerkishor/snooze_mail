"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthCallbackPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch("/api/get-auth-status", {
          method: "POST",
        });

        const data = await res.json();
        console.log("Auth fallback response:", data);

        if (data?.success) {
          router.push("/dashboard");
        } else {
			console.log("err")
          //router.push("/login"); // or show error
        }
      } catch (error) {
        console.error("Auth verification failed", error);
        //router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [router]);

  return (
    <div className="flex items-center justify-center flex-col h-screen relative">
      <div className="border-[3px] border-neutral-800 rounded-full border-b-neutral-200 animate-loading w-8 h-8"></div>
      <p className="text-lg font-medium text-center mt-3">
        Verifying your account...
      </p>
    </div>
  );
};

export default AuthCallbackPage;
