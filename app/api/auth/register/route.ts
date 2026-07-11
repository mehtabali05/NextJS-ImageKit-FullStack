import User from "@/app/models/User";
import { connectToMongoDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try{
        const {email, password} = await request.json();

        if(!email || !password){
            return NextResponse.json(
                {error: "Email and Password are required"},
                {status: 400}
            );
        }

        await connectToMongoDb();

        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json({
                error: "User already registered",
                status: 400
            });
        }

        const user = await User.create({
            email,
            password
        });

        return NextResponse.json(
            {message: "User registred successfully"},
            {status: 201}
        );
    }catch(error){
        console.error("Registration Error: ", error);
        return NextResponse.json(
            {error: "Failed to register user"},
            {status: 500},
        )
    }
}