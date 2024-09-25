import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import ytdl from "ytdl-core";

export async function GET(request: NextRequest, response: NextApiResponse) {
    const videoQualities: { [key: string]: string } = {
        tiny: "144p",
        small: "240p",
        medium: "360p",
        large: "480p",
        hd720: "720p",
        hd1080: "1080p",
        hd1440: "1440p",
        hd2160: "2160p",
        highres: "4320p",
    };

    let formats: { [key: string]: boolean } = {
        "144p": false,
        "240p": false,
        "360p": false,
        "480p": false,
        "720p": false,
        "1080p": false,
        "1440p": false,
        "2160p": false,
        "4320p": false,
    };

    const youtubeUrl = request.nextUrl.searchParams.get("url");
    if (youtubeUrl) {
        const isValidUrl = ytdl.validateURL(youtubeUrl);
        if (isValidUrl) {
            try {
                const info = await ytdl.getBasicInfo(youtubeUrl, {
                    requestOptions: {
                        header: {
                            Cookie: "SID=g.a000oAjq-pLtYZJYRkvOlE1OBjZCER7sFSMjwrMw9z8TtxtddGvgLuDHydvXhFXbSStaHTImmAACgYKAX8SARESFQHGX2MiLbL22DJ0ApHhQvHMc3v8hBoVAUF8yKpdC-vRJr0NgDBzYUUTtZrx0076; HSID=AiyzwJPzJ_p3pzKUn; SSID=AUSYn829kHW3u3ixy; APISID=9W5jiVWdwa5hDp-E/A_q6GXs1wmV33XJop; SAPISID=tu3YS4mDEFlSJOGI/AdBykimrzOcSLMsXF; LOGIN_INFO=AFmmF2swRgIhAMCMOkTRCVGUBet7BQ23-0z-Zwg-7jJh6IeiQhWgjh6JAiEAgYtN1mTY2GruXdOkYqx6tBqSesVyoHSCb7ejaD32R1s:QUQ3MjNmeDRDamJHX09DS09pS2NfNFRPV09TQmU1VkUySXhmWEozOU1BVS1ZS2VVN2lJekE3aWY5dTE0eHlfNjR5Snp2ME5XRlBmNGFWMjVKMllFRWV4bzYySnBPdlZDYllSaWh2enJfdGFXTHJuQ2ZPLTVpejVGcmJOREhNT1doYl9vZmZvUzNhWi1aQk5vX1BzV3BIT3dENDJLMWI0QXlB; YSC=xIGhE-Zwm9I; PREF=f7=4100&tz=Asia.Jakarta&f6=40000000&f5=30000&repeat=NONE&autoplay=true&volume=100&guide_collapsed=true; VISITOR_INFO1_LIVE=OBk8CtxF4WE",
                        },
                    },
                });
                info.formats
                    .filter((format) => format.mimeType?.includes("video/mp4"))
                    .forEach((format) => {
                        formats[videoQualities[format.quality.toString()]] =
                            true;
                    });

                return Response.json(
                    {
                        status: "Success",
                        message: "URL Valid",
                        data: {
                            title: info.videoDetails.title,
                            durationInSeconds: Number(
                                info.videoDetails.lengthSeconds
                            ),
                            thumbnail:
                                info.videoDetails.thumbnails[
                                    info.videoDetails.thumbnails.length - 1
                                ].url,
                            formats,
                            url: youtubeUrl,
                        },
                    },
                    { status: 200 }
                );
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
        } else {
            return Response.json(
                { status: "Failed", message: "Invalid URL" },
                { status: 400 }
            );
        }
    } else {
        return Response.json(
            { status: "Failed", message: "Invalid URL" },
            { status: 400 }
        );
    }
}
