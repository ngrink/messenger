import { FC } from 'react'
import { Message, MessageProps } from '../Message'

type ChatContentProps = {
  messages: MessageProps[]
}

export const ChatContent: FC<ChatContentProps> = ({ messages }) => {
  return (
    <div className="overflow-y-auto px-4 py-4">
      <div className="flex max-w-[450px] flex-col gap-6">
        {messages && messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
      </div>
    </div>
  )
}
