import { ChatContent } from '../ChatContent'
import { ChatHeader } from '../ChatHeader'
import { ChatInput } from '../ChatInput'

export const Chat = () => {
  return (
    <div className="grid h-full grid-rows-[60px_1fr_60px]">
      <ChatHeader
        name="Messenger Application Chat"
        description="12 members, 5 online"
      />
      <ChatContent />
      <ChatInput />
    </div>
  )
}
