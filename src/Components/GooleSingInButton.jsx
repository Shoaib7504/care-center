"use client"
import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function GooleSingInButton() {
    const router = useRouter()
    const handleSignIn = async () => {
        const res = await signIn('google', { redirect: false,callbackUrl:"/" })
        if (res?.error) {
            toast.error(res.error)
        } else {
            toast.success("Login successful")
            setTimeout(() => {
                router.push("/")
                router.refresh()
            }, 1500)
        }
    }
    return (
        <button
            type="button"
            onClick={handleSignIn}
            className="mt-6 w-full rounded-full border border-border bg-background text-foreground hover:bg-muted py-2.5 flex items-center justify-center gap-2.5 text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            <FaGoogle className="h-4 w-4 text-primary" />
            Continue with Google
        </button>
    )
}