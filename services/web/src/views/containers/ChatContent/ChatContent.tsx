import { observer } from 'mobx-react-lite'

import { ChatContent } from '@/components/ChatContent'
import { useStore } from '@/config'

export const ChatContentContainer = observer(() => {
  const { chatsStore } = useStore()

  if (!chatsStore.currentChatMessages) {
    return <ChatContent messages={[]} unreadMessages={[]} />
  }

  return (
    <ChatContent
      messages={chatsStore.currentChatMessages}
      unreadMessages={chatsStore.currentChatUnreadMessages}
    />
  )
})
