import { FC, useEffect, useRef } from 'react'
import { Message, MessageProps } from '../Message'

type ChatContentProps = {
  messages: MessageProps[]
}

export const ChatContent: FC<ChatContentProps> = ({ messages }) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'auto',
      block: 'end',
      inline: 'end',
    })
  }, [messages])

  return (
    <div className="overflow-y-auto">
      <div className="flex max-w-[450px] flex-col gap-6 px-4 py-4">
        {messages &&
          messages.map((message) => <Message key={message.id} {...message} />)}
      </div>
      <div ref={messagesEndRef} />
    </div>
  )
}
