import { observer } from 'mobx-react-lite'
import { ChatList } from '@/components/ChatList'
import { useStore } from '@/config'
import { ChatsService } from '@/modules/chats'

export const ChatListContainer = observer(() => {
  const { authStore, chatsStore } = useStore()
  const currentUserId = authStore.user?.id as number

  const onItemClick = async (chatId: number) => {
    chatsStore.setCurrentChatId(chatId)

    const messages = await ChatsService.getChatMessages(chatId)
    chatsStore.setMessages(chatId, messages)
  }

  return (
    <ChatList
      currentUserId={currentUserId}
      chats={chatsStore.chatsList}
      onItemClick={onItemClick}
    />
  )
})
