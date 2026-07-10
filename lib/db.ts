import mongoose from "mongoose";

const mongoDbURI = process.env.MONGODB_URI!;

if(!mongoDbURI){
    throw new Error("MongoDB URI not provided");
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {
        conn: null,
        promise: null
    }
}

export async function connectToMongoDb() {
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        }
        mongoose.connect(mongoDbURI, opts)
            .then(() => mongoose.connection)
    }

    try{
        cached.conn = await cached.promise;
    }catch(error){
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}