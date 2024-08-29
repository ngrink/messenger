import { observer } from 'mobx-react-lite'
import { ObservableSet } from 'mobx'

import { ChatContent } from '@/components/ChatContent'
import { useStore } from '@/config'
import { ChatsService } from '@/modules/chats'

export const ChatContentContainer = observer(() => {
  const { chatsStore } = useStore()

  const onScrollDownBtn = async () => {
    if (chatsStore.currentChatUnreadMessages.size > 0) {
      ChatsService.readAllMessages(chatsStore.currentChatId as number)
    }
    chatsStore.resetCurrentChatUnreadMessages()
  }

  if (!chatsStore.currentChatMessages) {
    return (
      <ChatContent
        id={chatsStore.currentChatId as number}
        messages={[]}
        unreadMessages={new ObservableSet()}
        onScrollChange={() => {}}
        onScrollDownBtn={() => {}}
      />
    )
  }

  return (
    <ChatContent
      id={chatsStore.currentChatId as number}
      messages={chatsStore.currentChatMessages}
      unreadMessages={chatsStore.currentChatUnreadMessages}
      onScrollChange={chatsStore.setIsScrolledDown}
      onScrollDownBtn={onScrollDownBtn}
    />
  )
})
