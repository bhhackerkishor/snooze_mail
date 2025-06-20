'use client'

import { motion } from "framer-motion";
import Input from "@/components/Input";
import FloatingShape from "@/components/FloatingShape";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import Link from 'next/link'
import SignUpForm from '@/components/auth/signup-form'
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";
import { useSignUp } from '@clerk/nextjs' // Import Clerk's useSignUp hook

const SignUpPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const { signUp, isSignUpInProgress, setSession } = useSignUp() // Clerk sign-up hook

	const handleSignUp = async (e) => {
		e.preventDefault();

        // Call Clerk's signUp method to register the user
		try {
			const { createdUser } = await signUp.create({
				emailAddress: email,
				password,
				firstName: name,
			});

			// Optionally, auto sign in the user after sign-up
			await setSession(createdUser);

			// Redirect to the dashboard or login page after successful registration
			// This could be achieved using Next.js useRouter
			window.location.href = "/dashboard"; // Adjust the URL based on your app's flow

		} catch (error) {
			alert("Error: " + error.message); // Handle error (display error to the user)
		}
	};

	return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
            <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Create Account
				</h2>

			</div>
			<SignUpForm />
			<div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Already have an account?{" "}
					<Link href="/login" className='text-green-400 hover:underline'>
						Login
					</Link>
				</p>
			</div>
		</motion.div>
        </div>
	);
};

export default SignUpPage;
