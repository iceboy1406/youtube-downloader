import axios from 'axios'

const downloadVideo = async ({
    codec,
    quality,
    url,
}: DownloadVideoRequestBody) => {
    try {
        const response = await axios.post<{ status: 'string'; url: string }>(
            'https://co.wuk.sh/api/json',
            {
                url,
                vQuality: quality,
                vCodec: codec,
                aFormat: 'best',
                filenamePattern: 'basic',
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
            'https://co.wuk.sh/api/json',
            {
                url,
                aFormat: format,
                isAudioOnly: true,
                filenamePattern: 'basic',
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
