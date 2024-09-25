import axios from "axios";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest, _response: NextApiResponse) {
    try {
        const { url, format }: DownloadAudioRequestBody =
            await request.json();
        const response = await axios.post<{ status: "string"; url: string }>(
            "https://api.cobalt.tools/",
            {
                url,
                audioFormat: format,
                downloadMode: "audio",
                filenameStyle: 'basic',
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
