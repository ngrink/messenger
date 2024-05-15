import { observer } from 'mobx-react-lite'

import { useStore } from '@/config'
import { ChatDetailsContainer } from '@/containers/ChatDetails'
import { ChatListContainer } from '@/containers/ChatList'
import { SearchInputContainer } from '@/containers/SearchInput'
import { SearchResultsContainer } from '@/containers/SearchResults'
import { Chat } from '@/components/Chat'
import { useEffect } from 'react'
import { ChatsService } from '@/modules/chats'

export const ChatScreen = observer(() => {
  const { chatsStore, searchStore } = useStore()

  const fetchChats = async () => {
    const chats = await ChatsService.getAllUserChats()
    chatsStore.setChats(chats)
  }

  useEffect(() => {
    try {
      fetchChats()
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <div className="grid h-screen grid-cols-[500px_1fr] overflow-hidden">
      <div className="h-screen">
        <SearchInputContainer />
        {!searchStore.query && <ChatListContainer />}
        {searchStore.query && <SearchResultsContainer />}
      </div>
      <div className="flex h-screen bg-[linear-gradient(to_right_bottom,rgba(174,195,144,0.92),rgba(191,203,132,0.92)),url('/assets/img/patterns/11.svg')]">
        {chatsStore.currentChatId && <Chat />}
        {chatsStore.currentChatId && <ChatDetailsContainer />}
      </div>
    </div>
  )
})
