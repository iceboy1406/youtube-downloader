import axios from 'axios'

const getYoutubeBasicInfo = async (url: string) => {
    try {
        const response = await axios.get<ApiResponse<YoutubeBasicInfo>>(
            `/api/info?url=${url}`
        )

        return response.data
    } catch (error) {
        throw error
    }
}

export default getYoutubeBasicInfo