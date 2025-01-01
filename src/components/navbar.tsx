'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link';


export default function Navbar() {
    const { user, isLoaded } = useUser();
    if (!isLoaded) return null;

    return (
        <nav className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 shadow-lg">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-white text-2xl font-extrabold mb-4 md:mb-0">MyTube</div>
                <div className="space-x-6 flex flex-row items-center">
                
                    <UserButton appearance={{
                        elements: {
                            avatarBox: "h-9 w-9"
                        }
                    }} />
                    <Link href={`/profile/${user?.id}`}>Profile</Link>
                </div>
            </div>
        </nav>
    )
}
