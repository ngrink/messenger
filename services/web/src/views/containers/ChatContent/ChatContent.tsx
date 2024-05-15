import { ChatContent } from '@/components/ChatContent'
import { useStore } from '@/config'
import { observer } from 'mobx-react-lite'

export const ChatContentContainer = observer(() => {
  const { chatsStore } = useStore()

  return <ChatContent messages={chatsStore.currentChatMessages} />
})
