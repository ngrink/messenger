import { FunctionComponent } from 'react'

import { MessageCard, MessageCardProps } from '../MessageCard'
import { Avatar } from '../Avatar'

type MessageProps = MessageCardProps

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
