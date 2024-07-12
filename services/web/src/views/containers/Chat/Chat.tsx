import { ChatHeaderContainer } from '@/containers/ChatHeader'
import { ChatContentContainer } from '@/containers/ChatContent'
import { ChatInputContainer } from '@/containers/ChatInput'

export const ChatContainer = () => {
  return (
    <div className="grid h-full flex-[1_1_auto] grid-rows-[60px_1fr_60px]">
      <ChatHeaderContainer />
      <ChatContentContainer />
      <ChatInputContainer />
    </div>
  )
}
