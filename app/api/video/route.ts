import Video, { IVideo } from "@/app/models/Video";
import { authOptions } from "@/lib/auth";
import { connectToMongoDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if(!session){
            return NextResponse.json(
                {error: "Unautorized"},
                {status: 401}
            );
        }

        await connectToMongoDb();

        const body: IVideo = await request.json();

        if(!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl){
            return NextResponse.json(
                {error: "required fields are missing"},
                {status: 400}
            );
        }

        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformations: {
                height: 1920,
                width: 1080,
                quality: body?.transformations?.quality ?? 100
            }
        };

        const newVideo = await Video.create(videoData);

        return NextResponse.json(newVideo);
    } catch (error) {
        console.error("Error in creating vide: ", error);
        return NextResponse.json(
            {error: "Failed to create video"},
            {status: 500}
        );
    }
}