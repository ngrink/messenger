import { observer } from 'mobx-react-lite'

import { useStore } from '@/config'
import { ChatsService } from '@/modules/chats'
import { ChatInput } from '@/components/ChatInput'

export const ChatInputContainer = observer(() => {
  const { chatsStore, searchStore } = useStore()

  const onSendMessage = async (text: string, attachments?: File[]) => {
    if (chatsStore.isVirtual) {
      let chat, messages
      let targetUserId = chatsStore.currentUserId as number

      chat = await ChatsService.createChat(targetUserId)
      await ChatsService.createChatMessage(chat.id, text, attachments)

      chat = await ChatsService.getChat(chat.id)
      messages = await ChatsService.getChatMessages(chat.id)

      chatsStore.addChat(chat)
      chatsStore.setMessages(chat.id, messages)
      chatsStore.setCurrentChatId(chat.id)

      searchStore.removeUser(targetUserId)
    } else {
      ChatsService.createChatMessage(
        chatsStore.currentChatId as number,
        text,
        attachments
      )
    }
  }

  return <ChatInput onSendMessage={onSendMessage} />
})
