import { FC, KeyboardEvent, useState } from 'react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { SendBtn } from '../SendBtn/SendBtn'

type ChatInputProps = {
  onSendMessage: (text: string) => void
}

export const ChatInput: FC<ChatInputProps> = ({ onSendMessage }) => {
  const [text, setText] = useState<string>('')

  const onSendMessageClick = () => {
    onSendMessage(text)
    setText('')
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSendMessageClick()
    }
  }

  return (
    <div className="flex items-center gap-2 border border-gray-100 bg-white px-3 py-2">
      <AttachmentBtn />
      <Input
        type="text"
        placeholder="Write a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SendBtn onClick={onSendMessageClick} />
    </div>
  )
}

export const AttachmentBtn = () => {
  return (
    <Button
      variant={'outline'}
      className="border-none px-2 opacity-70 hover:bg-transparent hover:opacity-100"
    >
      <img src={'/assets/icons/attachment.svg'} />
    </Button>
  )
}
