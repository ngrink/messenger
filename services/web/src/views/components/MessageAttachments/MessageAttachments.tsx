import { FC, useMemo } from 'react'

import { Attachment } from '@/modules/chats'
import { groupBy } from '@/shared/utils/groupBy'
import {
  AudioAttachmentGroup,
  AudioAttachmentProps,
  FileAttachmentGroup,
  FileAttachmentProps,
  ImageAttachmentGroup,
  ImageAttachmentProps,
  VideoAttachmentGroup,
  VideoAttachmentProps,
} from '../Attachments'

type MessageAttachmentsProps = {
  attachments: Attachment[]
  author: {
    profile: {
      name: string
      avatar: string
    }
  }
  createdAt: string
}

export const MessageAttachments: FC<MessageAttachmentsProps> = ({
  attachments,
  author,
  createdAt,
}) => {
  if (!attachments.length) {
    return null
  }

  const data = useMemo(() => {
    const groups: Record<string, Attachment[]> = groupBy(attachments, 'type')

    const images: ImageAttachmentProps[] = (groups['image'] ?? []).map(
      (item: Attachment) => ({
        src: item.location,
      })
    )
    const videos: VideoAttachmentProps[] = (groups['video'] ?? []).map(
      (item: Attachment) => ({
        src: item.location,
      })
    )
    const audios: AudioAttachmentProps[] = (groups['audio'] ?? []).map(
      (item: Attachment) => ({
        src: item.location,
        name: item.originalName,
      })
    )
    const files: FileAttachmentProps[] = Object.keys(groups)
      .map((k) =>
        ['image', 'video', 'audio'].includes(k) ? [] : groups[k] ?? []
      )
      .flat()
      .map((item: Attachment) => ({
        src: item.location,
        name: item.originalName,
        size: item.size,
      }))

    return { images, videos, audios, files }
  }, [attachments])

  return (
    <div className="flex w-[450px] max-w-full flex-col gap-2 pt-2">
      <ImageAttachmentGroup
        data={data.images}
        author={author}
        createdAt={createdAt}
      />
      <VideoAttachmentGroup data={data.videos} />
      <AudioAttachmentGroup data={data.audios} />
      <FileAttachmentGroup data={data.files} />
    </div>
  )
}
