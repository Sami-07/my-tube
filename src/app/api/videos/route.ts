import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { Video } from "@/drizzle/schema";
import { randomUUID } from "crypto";
export async function GET(request: Request) {
    return NextResponse.json({ message: "Hello, World!" });
}

export async function POST(request: Request) {
    try {
        const { title, description, videoKey, thumbnailKey, userId } = await request.json();

        const video = await db.insert(Video).values({
            id: randomUUID(),
            title,
            description,
            videoKey,
            thumbnailKey,
            userId,
        })

        return NextResponse.json({ message: "Video uploaded successfully" });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });

    }

}

