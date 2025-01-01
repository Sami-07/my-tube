import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { Video } from "@/drizzle/schema";
export async function GET(request: Request) {
   try {
     const { searchParams } = new URL(request.url);
     const page = searchParams.get('page') || 1;
     const limit = 12;
     const videos = await db.select().from(Video).limit(Number(limit)).offset(Number(page));
        return NextResponse.json(videos);
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
   }
}