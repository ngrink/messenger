import { FC, useEffect, useRef, useState } from 'react'

import { useStore } from '@/config'
import { useIsInViewport } from '@/shared/hooks'
import { MessageCardProps } from '../MessageCard'
import { Message } from '../Message'

type UnreadMessageCardProps = MessageCardProps

export const UnreadMessage: FC<UnreadMessageCardProps> = ({
  id,
  author,
  text,
  attachments,
  createdAt,
}) => {
  const { chatsStore } = useStore()
  const [isUnread, setIsUnread] = useState(true)

  const ref = useRef(null)
  const isInViewport = useIsInViewport(ref);

  useEffect(() => {
    if (isUnread && isInViewport) {
        chatsStore.readMessage(id)
        setIsUnread(false)
        console.log(`Message with ID ${id} has read`)
    }
  }, [isInViewport])

  return (
    <div ref={ref}>
      <Message
        id={id}
        author={author}
        text={text}
        attachments={attachments}
        createdAt={createdAt}
        />
    </div>
  )
}
