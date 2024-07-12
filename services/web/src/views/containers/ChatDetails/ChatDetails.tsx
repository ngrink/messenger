import { observer } from 'mobx-react-lite'

import { ChatDetails } from '@/components/ChatDetails'
import { useStore } from '@/config'

export const ChatDetailsContainer = observer(() => {
  const { chatsStore, searchStore } = useStore()

  const name = !chatsStore.isVirtual
    ? (chatsStore.currentChatName as string)
    : searchStore.users.filter(
        (user) => user.id === chatsStore.currentUserId
      )[0].profile.name

  const avatar = !chatsStore.isVirtual
    ? chatsStore.currentChatAvatar
    : searchStore.users.filter(
        (user) => user.id === chatsStore.currentUserId
      )[0].profile.avatar

  return (
    <ChatDetails
      name={name}
      avatar={avatar || undefined}
      isHidden={chatsStore.isOpenedDetails}
    />
  )
})
