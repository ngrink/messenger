import { useStore } from '@/config'
import { ChatsService } from '@/modules/chats'
import { ChatInput } from '@/components/ChatInput'

export const ChatInputContainer = () => {
  const { chatsStore } = useStore()

  const onSendMessage = async (text: string) => {
    if (!chatsStore.currentChatId) {
      return
    }

    ChatsService.createChatMessage(chatsStore.currentChatId, text)
  }

  return <ChatInput onSendMessage={onSendMessage} />
}
