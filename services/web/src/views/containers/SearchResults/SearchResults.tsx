import { observer } from 'mobx-react-lite'

import { SearchResults } from '@/components/SearchResults'
import { useStore } from '@/config'

export const SearchResultsContainer = observer(() => {
  const { searchStore, chatsStore } = useStore()
  // const { users, chats } = searchStore.results
  const local = chatsStore.chatsList.filter((chat) => {
    return chat.name?.includes(searchStore.query)
  })

  return <SearchResults local={local} />
})
