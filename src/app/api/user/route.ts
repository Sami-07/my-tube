import { db } from "@/drizzle/db";
import { User } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, response: NextResponse) {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    if (!userId) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    try {
        const user = await db.query.User.findFirst({
            where: eq(User.id, userId),
        });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}

