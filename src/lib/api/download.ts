import axios from 'axios'

const downloadVideo = async ({
    codec,
    quality,
    url,
}: DownloadVideoRequestBody) => {
    try {
        const response = await axios.post<{ status: 'string'; url: string }>(
            '/api/download/video',
            {
                url,
                quality,
                codec,
            },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        )

        return response.data.url
    } catch (error) {
        throw error
    }
}

const downloadAudio = async ({ url, format }: DownloadAudioRequestBody) => {
    try {
        const response = await axios.post<{ status: 'string'; url: string }>(
            '/api/download/audio',
            {
                url,
                format,
            },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        )

        return response.data.url
    } catch (error) {
        throw error
    }
}

export { downloadVideo, downloadAudio }
