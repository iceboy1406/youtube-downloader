import DownloadItems from './DownloadItems'
import Tabs from './Tabs'
interface Props {
    youtubeBasicInfo: YoutubeBasicInfo
}
const DownloadOptions: React.FC<Props> = ({ youtubeBasicInfo }) => {
    return (
        <div className="bg-light p-4 rounded-md w-full">
            {youtubeBasicInfo.url.includes('music.youtube.com') ? (
                <DownloadItems
                    type="audio"
                    items={[
                        { format: 'mp3', label: 'MP3' },
                        { format: 'wav', label: 'WAV' },
                        { format: 'ogg', label: 'OGG' },
                        { format: 'opus', label: 'OPUS' },
                    ]}
                    url={youtubeBasicInfo.url}
                />
            ) : (
                <Tabs defaultValue="video">
                    <Tabs.List>
                        <Tabs.Tab value="video">Video</Tabs.Tab>
                        <Tabs.Tab value="audio">Audio</Tabs.Tab>
                    </Tabs.List>
                    {/* divider */}
                    <div className="h-4 w-full"></div>

                    <Tabs.Panel value="video">
                        <Tabs defaultValue="h264">
                            <Tabs.List>
                                <Tabs.Tab value="h264">MP4 (H264)</Tabs.Tab>
                                <Tabs.Tab value="av1">MP4 (AV1)</Tabs.Tab>
                                <Tabs.Tab value="vp9">WEBM (VP9)</Tabs.Tab>
                            </Tabs.List>
                            <div className="h-4 w-full"></div>
                            <Tabs.Panel value="h264">
                                <DownloadItems
                                    url={youtubeBasicInfo.url}
                                    type="video"
                                    items={Object.keys(youtubeBasicInfo.formats)
                                        .filter((format) => {
                                            if (format == '1440p') return false
                                            if (format == '2160p') return false
                                            if (format == '4320p') return false
                                            return youtubeBasicInfo.formats[
                                                format
                                            ]
                                        })
                                        .map((format) => ({
                                            label:
                                                format == '1080p'
                                                    ? '1080p (Full HD)'
                                                    : format,
                                            format: format.replace('p', ''),
                                            codec: 'h264',
                                        }))}
                                />
                            </Tabs.Panel>
                            <Tabs.Panel value="av1">
                                <DownloadItems
                                    url={youtubeBasicInfo.url}
                                    type="video"
                                    items={Object.keys(youtubeBasicInfo.formats)
                                        .filter((format) => {
                                            return youtubeBasicInfo.formats[
                                                format
                                            ]
                                        })
                                        .map((format) => ({
                                            label:
                                                format == '1080p'
                                                    ? '1080p (Full HD)'
                                                    : format == '1440p'
                                                    ? '1440p (QHD)'
                                                    : format == '2160p'
                                                    ? '2160p (4K)'
                                                    : format == '4320p'
                                                    ? '4320p (8K)'
                                                    : format,
                                            format: format.replace('p', ''),
                                            codec: 'av1',
                                        }))}
                                />
                            </Tabs.Panel>
                            <Tabs.Panel value="vp9">
                                <DownloadItems
                                    url={youtubeBasicInfo.url}
                                    type="video"
                                    items={Object.keys(youtubeBasicInfo.formats)
                                        .filter((format) => {
                                            if (format == '4320p') return false
                                            return youtubeBasicInfo.formats[
                                                format
                                            ]
                                        })
                                        .map((format) => ({
                                            label:
                                                format == '1080p'
                                                    ? '1080p (Full HD)'
                                                    : format == '1440p'
                                                    ? '1440p (QHD)'
                                                    : format == '2160p'
                                                    ? '2160p (4K)'
                                                    : format,
                                            format: format.replace('p', ''),
                                            codec: 'vp9',
                                        }))}
                                />
                            </Tabs.Panel>
                        </Tabs>
                    </Tabs.Panel>
                    <Tabs.Panel value="audio">
                        <DownloadItems
                            url={youtubeBasicInfo.url}
                            type="audio"
                            items={[
                                { format: 'mp3', label: 'MP3' },
                                { format: 'wav', label: 'WAV' },
                                { format: 'ogg', label: 'OGG' },
                                { format: 'opus', label: 'OPUS' },
                            ]}
                        />
                    </Tabs.Panel>
                </Tabs>
            )}
        </div>
    )
}

export default DownloadOptions
