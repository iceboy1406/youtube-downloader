import Image from 'next/image'
import React from 'react'

interface Props {
    title: string
    thumbnail: string
    duration: string
}

const YoutubeBasicInfo: React.FC<Props> = ({ duration, thumbnail, title }) => {
    return (
        <div className="w-full max-w-xl flex flex-col items-center gap-4">
            <div className="relative w-full aspect-video">
                <Image
                    src={thumbnail}
                    alt="Youtube Thumbnail"
                    fill
                    className="object-cover rounded-lg sm:rounded-xl"
                    unoptimized
                />
                <p className="absolute bottom-2 right-2 px-2 py-1 rounded bg-dark/[.5] backdrop-blur-sm">
                    {duration}
                </p>
            </div>
            <p className="text-xl">{title}</p>
        </div>
    )
}

export default YoutubeBasicInfo
