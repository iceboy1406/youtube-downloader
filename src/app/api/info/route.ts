import { NextApiResponse } from 'next'
import { NextRequest } from 'next/server'
import ytdl from 'ytdl-core'

export async function GET(request: NextRequest, response: NextApiResponse) {
    const videoQualities: { [key: string]: string } = {
        tiny: '144p',
        small: '240p',
        medium: '360p',
        large: '480p',
        hd720: '720p',
        hd1080: '1080p',
        hd1440: '1440p',
        hd2160: '2160p',
        highres: '4320p',
    }

    let formats: { [key: string]: boolean } = {
        '144p': false,
        '240p': false,
        '360p': false,
        '480p': false,
        '720p': false,
        '1080p': false,
        '1440p': false,
        '2160p': false,
        '4320p': false,
    }

    const youtubeUrl = request.nextUrl.searchParams.get('url')
    if (youtubeUrl) {
        const isValidUrl = ytdl.validateURL(youtubeUrl)
        if (isValidUrl) {
            try {
                const info = await ytdl.getBasicInfo(youtubeUrl)
                info.formats
                    .filter((format) => format.mimeType?.includes('video/mp4'))
                    .forEach((format) => {
                        formats[videoQualities[format.quality.toString()]] =
                            true
                    })

                return Response.json(
                    {
                        status: 'Success',
                        message: 'URL Valid',
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
                )
            } catch (error) {
                console.log(error);
                return Response.json(
                    {
                        status: 'Failed',
                        message: 'Something Went Wrong',
                    },
                    { status: 400 }
                )
            }
        } else {
            return Response.json(
                { status: 'Failed', message: 'Invalid URL' },
                { status: 400 }
            )
        }
    } else {
        return Response.json(
            { status: 'Failed', message: 'Invalid URL' },
            { status: 400 }
        )
    }
}
