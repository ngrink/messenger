import { FunctionComponent } from 'react'

import { Attachment } from '@/modules/chats'
import { Avatar } from '../Avatar'
import { MessageAttachments } from '../MessageAttachments'
import { Card } from '../ui/card'

export type MessageProps = {
  id: number
  author: {
    profile: {
      name: string
      avatar: string
    }
  }
  text: string
  attachments: Attachment[]
  createdAt: string
}

type MessageCardProps = MessageProps

export const Message: FunctionComponent<MessageProps> = ({
  id,
  author,
  text,
  attachments,
  createdAt,
}) => {
  const avatarFallback = author.profile.name
    .split(' ')
    .slice(0, 2)
    .map((item) => item[0])
    .join('')

  return (
    <div className={`flex w-full items-end gap-4 text-wrap`}>
      <Avatar
        image={author.profile.avatar}
        fallback={avatarFallback}
        variant="small"
      />
      <MessageCard
        id={id}
        author={author}
        text={text}
        attachments={attachments}
        createdAt={createdAt}
      />
    </div>
  )
}

const MessageCard: FunctionComponent<MessageCardProps> = ({
  author,
  text,
  attachments,
  createdAt,
}) => {
  return (
    <Card className="flex max-w-[450px] flex-col rounded-xl bg-white p-2.5">
      {/* HEADER */}
      <div>
        <div className="text-xs font-medium text-slate-500">
          {author.profile.name}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-2">
        <MessageAttachments
          attachments={attachments}
          author={author}
          createdAt={createdAt}
        />
        <div className="break-words text-sm font-normal">{text}</div>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between">
        <div></div>
        <div>
          <div className="text-xs font-light text-gray-500">{createdAt}</div>
        </div>
      </div>
    </Card>
  )
}
