'use client'

import { useState,useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import  Input  from "@/components/Input"
import FloatingShape from "@/components/FloatingShape"
import Link from 'next/link'
import { SignIn } from '@clerk/nextjs'
import { useSignIn } from "@clerk/nextjs"

const LoginPage = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")
	const router = useRouter()
	const { signIn, setActive } = useSignIn()
	
	


	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError("")

		try {
			const result = await signIn.create({
				identifier: email,
				password,
			})
			
			

			if (result.status === "complete") {
				await setActive({ session: result.createdSessionId })
				router.push("/auth-callback") // ✅ redirect after login
			} else {
				console.log(result)
			}
		} catch (err: any) {
			console.error(err)
			setError(err.errors?.[0]?.message || "Login failed")
		} finally {
			setIsLoading(false)
		}
	}

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
						Welcome Back
					</h2>

					<form onSubmit={handleLogin}>
						<Input
							icon={Mail}
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<Input
							icon={Lock}
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						{error && <p className='text-red-400 text-sm my-2'>{error}</p>}

						<div className='flex items-center mb-6'>
							<Link href='/forgot-password' className='text-sm text-green-400 hover:underline'>
								Forgot password?
							</Link>
						</div>

						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
							type='submit'
							disabled={isLoading}
						>
							{isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Login"}
						</motion.button>
					</form>
				</div>

				<div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
					<p className='text-sm text-gray-400'>
						Don't have an account?{" "}
						<Link href='/sign-up' className='text-sm text-green-400 hover:underline'>
							Sign Up
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	)
}

export default LoginPage
