import axios from "axios";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest, _response: NextApiResponse) {
    try {
        const { url, codec, quality }: DownloadVideoRequestBody =
            await request.json();
        const response = await axios.post<{ status: "string"; url: string }>(
            "https://api.cobalt.tools/",
            {
                url,
                videoQuality: quality,
                youtubeVideoCodec: codec,
                audioFormat: "best",
                filenameStyle: "basic",
            },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );

        return Response.json(response.data);
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                status: "Failed",
                message: "Something Went Wrong",
            },
            { status: 400 }
        );
    }
}
