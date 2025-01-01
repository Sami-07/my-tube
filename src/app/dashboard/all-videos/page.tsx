import { eq } from 'drizzle-orm';
import { db } from '@/drizzle/db';
import { Video } from '@/drizzle/schema';
import React from 'react'
import {  redirect } from 'next/navigation';
import { auth, User as ClerkUser } from '@clerk/nextjs/server';
import EachVideo from '@/components/dashboard/each-video';
import { VideoType } from '@/lib/types/video-type';
import { User } from '@/drizzle/schema';

export default async function AllVideos({searchParams}: {searchParams: {page: number}}) {
    const { userId } = await auth()
    if(!userId) {
        redirect('/sign-in');
    }
    const page = Number(searchParams.page) || 1;
    const limit = 15;
    const offset = (page - 1) * limit;
    console.log("page number", page)
    const videos = await db.select().from(Video).innerJoin(User, eq(Video.userId, User.id)).where(eq(Video.userId, userId)).limit(limit).offset(offset);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {videos.map((video) => (
            <div key={video.video.id}>
                <EachVideo video={video.video as unknown as VideoType}/>
            </div>
        ))}
    </div>
  )
}
