'use client'

import AlertError from '@/components/AlertError'
import DownloadOptions from '@/components/DownloadOptions'
import Title from '@/components/Title'
import YoutubeBasicInfo from '@/components/YoutubeBasicInfo'
import YoutubeUrlForm from '@/components/YoutubeUrlForm'
import useProcessUrl from '@/hooks/useProcessUrl'
import getFormatDuration from '@/lib/getFormatDuration'

export default function Home() {
    const { error, isLoading, processUrl, youtubeBasicInfo } = useProcessUrl()
    return (
        <main className="w-full min-h-screen bg-[url('/assets/images/page-background.svg')] bg-cover bg-dark bg-top">
            <div className="flex justify-center w-full min-h-screen bg-dark/[.80] backdrop-blur-[175px] px-7 py-8">
                <div className="w-full max-w-xl flex flex-col gap-8 items-center">
                    <Title />
                    <YoutubeUrlForm onSubmit={(url) => processUrl(url)} />
                    {error.isError ? (
                        <AlertError errorMessage={error.errorMessage} />
                    ) : isLoading ? (
                        <div className="dot-pulse"></div>
                    ) : (
                        youtubeBasicInfo && (
                            <>
                                <YoutubeBasicInfo
                                    title={youtubeBasicInfo.title}
                                    thumbnail={youtubeBasicInfo.thumbnail}
                                    duration={getFormatDuration(
                                        youtubeBasicInfo.durationInSeconds
                                    )}
                                />
                                <DownloadOptions youtubeBasicInfo={youtubeBasicInfo} />
                            </>
                        )
                    )}
                </div>
            </div>
        </main>
    )
}
