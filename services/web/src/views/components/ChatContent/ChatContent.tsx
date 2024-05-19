import { FC, useEffect, useRef } from 'react'

import { UnreadMessage } from '@/modules/chats'
import { Message, MessageProps } from '../Message'

type ChatContentProps = {
  messages: MessageProps[]
  unreadMessages: UnreadMessage[]
}

export const ChatContent: FC<ChatContentProps> = ({
  messages,
  unreadMessages,
}) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const firstUnreadMessage = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (!unreadMessages.length) {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'auto',
        block: 'end',
        inline: 'end',
      })
    }
  }, [unreadMessages, messages])

  useEffect(() => {
    if (unreadMessages.length) {
      firstUnreadMessage.current?.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'end',
      })
    }
  }, [unreadMessages])

  return (
    <div className="overflow-y-auto">
      <div className="flex flex-col gap-6 py-4">
        {messages &&
          messages.map((message) => {
            if (
              unreadMessages.length &&
              unreadMessages[0].messageId === message.id
            ) {
              return (
                <li key={message.id} className="flex list-none flex-col gap-6">
                  <div
                    ref={firstUnreadMessage}
                    className="flex w-full justify-center bg-white px-1 py-2 text-sm text-sky-500"
                  >
                    Unread messages
                  </div>

                  <li className="max-w-[450px] list-none px-4">
                    <Message {...message} />
                  </li>
                </li>
              )
            }

            return (
              <li key={message.id} className="max-w-[450px] list-none px-4">
                <Message {...message} />
              </li>
            )
          })}
      </div>
      <div ref={messagesEndRef} />
    </div>
  )
}
