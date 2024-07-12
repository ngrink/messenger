import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '@/config'
import { ChatHeader } from '@/components/ChatHeader'

export const ChatHeaderContainer: FC = observer(() => {
  const { chatsStore, searchStore } = useStore()

  const name = !chatsStore.isVirtual
    ? (chatsStore.currentChatName as string)
    : searchStore.users.filter(
        (user) => user.id === chatsStore.currentUserId
      )[0].profile.name

  const description = !chatsStore.isVirtual
    ? 'last seen recently'
    : 'last seen recently'

  return <ChatHeader name={name} description={description} />
})
