import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '@/config'
import { ChatHeader } from '@/components/ChatHeader'

export const ChatHeaderContainer: FC = observer(() => {
  const { chatsStore } = useStore()

  return (
    <ChatHeader
      name={chatsStore.currentChatName || ''}
      description={'last seen recently'}
    />
  )
})
