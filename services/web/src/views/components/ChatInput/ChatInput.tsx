import { FC, KeyboardEvent, useState } from 'react'

import { Input } from '../ui/input'
import { SendBtn } from '../SendBtn'
import { AttachmentsUpload } from '../../containers/AttachmentsUpload'

type ChatInputProps = {
  onSendMessage: (text: string, attachments?: File[]) => void
}

export const ChatInput: FC<ChatInputProps> = ({ onSendMessage }) => {
  const [text, setText] = useState<string>('')

  const onSendTextMessage = () => {
    onSendMessage(text)
    setText('')
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSendTextMessage()
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 border border-gray-100 bg-white px-3 py-2">
        <AttachmentsUpload onSend={onSendMessage} />
        <Input
          type="text"
          placeholder="Write a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <SendBtn onClick={onSendTextMessage} />
      </div>
      <div className="h-48 bg-gray-300"></div>
    </div>
  )
}
