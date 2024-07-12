import { FunctionComponent } from 'react'
import { ChatListItem } from '../ChatListItem'
import { Chat } from '@/modules/chats'

type ChatListProps = {
  currentUserId: number
  currentChatId: number
  chats: Chat[]
  onItemClick: (chatId: number) => void
}

export const ChatList: FunctionComponent<ChatListProps> = ({
  currentUserId,
  currentChatId,
  chats,
  onItemClick,
}) => {
  return (
    <div className="flex h-full flex-col overflow-y-auto ">
      {chats &&
        chats.map((chat) => {
          let name = chat.name || ''
          let avatar = chat.avatar

          if (chat.type === 'PERSONAL') {
            let interlocutor = chat.members.filter(
              (member) => member.userId != currentUserId
            )[0]

            name = interlocutor.user.profile.name
            avatar = interlocutor.user.profile.avatar
          }

          return (
            <ChatListItem
              key={chat.id}
              id={chat.id}
              type={chat.type}
              name={name}
              avatar={avatar}
              lastMessage={chat.lastMessage}
              unreadMessages={chat.unreadMessages}
              variant="default"
              onClick={onItemClick}
              active={currentChatId === chat.id}
            />
          )
        })}
    </div>
  )
}
