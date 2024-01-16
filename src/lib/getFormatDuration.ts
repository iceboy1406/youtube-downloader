function getFormatDuration(seconds: number) {
    return new Date(seconds * 1000)
        .toISOString()
        .slice(seconds >= 3600 ? 11 : 14, 19)
}

export default getFormatDuration
