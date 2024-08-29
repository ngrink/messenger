import { FC } from "react"

import { Attachment } from "@/modules/chats"
import { MessageAttachments } from "../MessageAttachments"
import { Card } from '../ui/card'

export type MessageCardProps = {
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

export const MessageCard: FC<MessageCardProps> = ({
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
