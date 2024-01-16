import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import AlertError from '../AlertError'
import { downloadAudio, downloadVideo } from '@/lib/api/download'

interface DownloadItem {
    label: string
    format: string
    codec?: string
}

interface Props extends React.ComponentPropsWithoutRef<'div'> {
    items: DownloadItem[]
    type: 'audio' | 'video'
    url: string
}
const DownloadItems: React.FC<Props> = ({ type, items, url }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    async function processing(format: string, codec?: string) {
        setIsError(false)
        setIsLoading(false)
        try {
            setIsLoading(true)
            if (type == 'audio') {
                const streamUrl = await downloadAudio({ format, url })
                window.open(streamUrl)
            } else {
                const streamUrl = await downloadVideo({
                    quality: format,
                    url,
                    codec: codec!,
                })
                window.open(streamUrl)
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setIsError(true)
        }
    }
    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="w-full border border-white/[.15] rounded-md grid grid-cols-2">
                    <div className="flex justify-center items-center py-2">
                        {type == 'video' ? 'Quality' : 'Format'}
                    </div>
                    <div className="flex justify-center items-center p-1 border-l border-l-white/[.15]">
                        Action
                    </div>
                </div>
                {items.map((downloadItem) => (
                    <div
                        className="w-full border border-white/[.15] rounded-md grid grid-cols-2"
                        key={`${type}-${downloadItem.codec}-${downloadItem.format}`}
                    >
                        <div className="flex justify-center items-center py-2">
                            {downloadItem.label}
                        </div>
                        <div className="flex justify-center items-center p-1 border-l border-l-white/[.15]">
                            <button
                                className="bg-light px-6 py-2 rounded-md w-full"
                                onClick={() =>
                                    processing(
                                        downloadItem.format,
                                        downloadItem.codec
                                    )
                                }
                            >
                                Download
                            </button>
                        </div>
                    </div>
                ))}
                {isError && (
                    <AlertError errorMessage="Sorry. Something went wrong" />
                )}
            </div>
            {isLoading &&
                createPortal(
                    <div className="fixed left-0 top-0 z-50 bg-dark/[.5] backdrop-blur-sm w-full h-screen flex justify-center items-center">
                        <div className="w-full max-w-[250px] bg-light text-center py-4 text-2xl rounded-md">
                            Processing ...
                        </div>
                    </div>,
                    document.body
                )}
        </>
    )
}

export default DownloadItems
