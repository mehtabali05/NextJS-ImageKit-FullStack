import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {

    try {
        const imagekitAuthParams = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, // Never expose this on client side
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
        })
    
        return Response.json({ 
            imagekitAuthParams,
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY 
        })
    } catch (error) {
        console.error("Image kit Auth error: ", error);
        return Response.json(
            {error: "Image Kit auth params generate failed"},
            {status: 500}
        );
    }
}