interface YoutubeBasicInfo {
    title: string
    durationInSeconds: number
    thumbnail: string
    formats: { [key: string]: boolean }
    url: string
}

interface ApiResponse<Data = undefined> {
    status: 'Failed' | 'Success'
    message: string
    data: Data
}
