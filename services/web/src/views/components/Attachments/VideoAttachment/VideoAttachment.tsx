import { FC } from 'react'

type VideoAttachmentGroupProps = {
  data: VideoAttachmentProps[]
}

export type VideoAttachmentProps = {
  src: string
}

export const VideoAttachmentGroup: FC<VideoAttachmentGroupProps> = ({
  data,
}) => {
  if (data.length === 0) {
    return null
  }

  return (
    <div>
      <ul className="flex flex-col gap-2">
        {data.map((item) => (
          <li key={item.src}>
            <VideoAttachment src={item.src} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export const VideoAttachment: FC<VideoAttachmentProps> = ({ src }) => {
  return (
    <div>
      <video src={src} controls className="w-full" />
    </div>
  )
}
