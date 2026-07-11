import Video from "@/app/models/Video";
import { connectToMongoDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToMongoDb();

        const videos = await Video.find({}).sort({createdAt: -1}).lean();

        if(!videos || videos.length === 0){
            return NextResponse.json(
                [],
                {status: 200}
            );
        }

        return NextResponse.json(videos);

    } catch (error) {
        return NextResponse.json(
            {error: "Failed to fetch videos"},
            {status: 500}
        );
    }
}