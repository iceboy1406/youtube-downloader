import getYoutubeBasicInfo from '@/lib/api/info/getYoutubeBasicInfo'
import { useState } from 'react'

const useProcessUrl = () => {
    const [youtubeBasicInfo, setYoutubeBasicInfo] = useState<YoutubeBasicInfo>()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({
        isError: false,
        errorMessage: '',
    })

    function resetState() {
        setIsLoading(false)
        setError({
            isError: false,
            errorMessage: '',
        })
        setYoutubeBasicInfo(undefined)
    }

    async function processUrl(url: string) {
        resetState()
        // Only processing when url not empty (empty string)
        if (url) {
            try {
                setIsLoading(true)
                const response = await getYoutubeBasicInfo(url)
                setIsLoading(false)
                if (response.data.durationInSeconds > 10800) {
                    setError({
                        isError: true,
                        errorMessage: `Sorry we can't process video more than 180 minutes`,
                    })
                } else {
                    setYoutubeBasicInfo(response.data)
                }
            } catch (error) {
                setIsLoading(false)
                setError({
                    isError: true,
                    errorMessage: 'Please enter valid url',
                })
            }
        } else {
            setError({
                isError: true,
                errorMessage: 'Please enter a url',
            })
        }
    }

    return { isLoading, error, youtubeBasicInfo, processUrl }
}

export default useProcessUrl
