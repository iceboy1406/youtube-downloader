'use client'
import React, { useState } from 'react'

interface Props {
    onSubmit: (url: string) => void
}

const YoutubeUrlForm: React.FC<Props> = ({ onSubmit }) => {
    const [url, setUrl] = useState('')
    return (
        <div className="w-full flex flex-col items-center gap-4 sm:gap-0 sm:flex-row">
            <input
                type="text"
                className="w-full bg-light text-white text-lg px-6 py-3 focus:outline-none rounded-md sm:rounded-e-none"
                placeholder="Enter or paste video link here"
                value={url}
                onChange={(e) => {
                    setUrl(e.target.value)
                }}
                onKeyUp={(e) => {
                    if (e.key == 'Enter') {
                        onSubmit(url)
                    }
                }}
                onPaste={(e) => {
                    onSubmit(e.clipboardData.getData('text'))
                }}
            />
            <button
                className="bg-primary px-6 py-3 rounded-md w-full sm:w-fit sm:rounded-s-none text-lg hover:brightness-95"
                onClick={() => onSubmit(url)}
            >
                Download
            </button>
        </div>
    )
}

export default YoutubeUrlForm
