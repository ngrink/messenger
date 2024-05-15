import { observer } from 'mobx-react-lite'

import { ChatDetails } from '@/components/ChatDetails'
import { useStore } from '@/config'

export const ChatDetailsContainer = observer(() => {
  const { chatsStore } = useStore()

  return (
    <ChatDetails
      name={chatsStore.currentChatName || ''}
      avatar={chatsStore.currentChatAvatar || ''}
      isHidden={chatsStore.isOpenedDetails}
    />
  )
})
