import { FunctionComponent } from 'react'
import { ChatListItem, ChatListItemProps } from '../ChatListItem'

type ChatListProps = {
  items: ChatListItemProps[]
}

export const ChatList: FunctionComponent<ChatListProps> = ({ items }) => {
  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      {items.map((item) => {
        return <ChatListItem key={item.chatId} {...item} />
      })}
    </div>
  )
}
