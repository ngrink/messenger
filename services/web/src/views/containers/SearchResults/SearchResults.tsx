import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '@/config'
import { ChatType, ChatsService } from '@/modules/chats'
import { ChatListContainer } from '../ChatList'
import { ChatListItem } from '@/components/ChatListItem'

export const SearchResultsContainer = observer(() => {
  return (
    <div className="flex h-[calc(100%-60px)] flex-col overflow-auto">
      <div>
        <ChatListContainer />
      </div>
      <GlobalSearchResultsContainer />
      <SearchMessagesContainer />
    </div>
  )
})

const GlobalSearchResultsContainer = observer(() => {
  return (
    <div>
      <div className="bg-gray-100 px-4 py-2 text-sm text-gray-400">
        Global search results
      </div>
      <div>
        <SearchUserListContainer />
        <SearchChatListContainer />
      </div>
    </div>
  )
})

export const SearchUserListContainer: FC = observer(() => {
  const { chatsStore, searchStore } = useStore()
  const users = searchStore.users

  const onItemClick = async (userId: number) => {
    chatsStore.setVirtualChat(userId)
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto ">
      {users &&
        users.map((user) => {
          return (
            <ChatListItem
              key={user.id}
              id={user.id}
              type={ChatType.PERSONAL}
              name={user.profile.name}
              avatar={user.profile.avatar}
              variant="search"
              identifier={user.username}
              onClick={onItemClick}
              active={chatsStore.currentUserId === user.id}
            />
          )
        })}
    </div>
  )
})

export const SearchChatListContainer: FC = observer(() => {
  const { chatsStore, searchStore } = useStore()
  const chats = searchStore.chats

  const onItemClick = async (chatId: number) => {
    chatsStore.setCurrentChatId(chatId)

    const messages = await ChatsService.getChatMessages(chatId)
    chatsStore.setMessages(chatId, messages)
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto ">
      {chats &&
        chats.map((chat) => {
          return (
            <ChatListItem
              key={chat.id}
              id={chat.id}
              type={chat.type}
              name={chat.name as string}
              avatar={chat.avatar}
              variant="search"
              identifier={chat.link}
              onClick={onItemClick}
              active={chatsStore.currentUserId === chat.id}
            />
          )
        })}
    </div>
  )
})

const SearchMessagesContainer = observer(() => {
  return (
    <div>
      <div className="bg-gray-100 px-4 py-2 text-sm text-gray-400">
        Found messages
      </div>
    </div>
  )
})
