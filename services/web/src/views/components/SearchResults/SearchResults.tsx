import { FC } from 'react'

import { Chat, ChatType } from '@/modules/chats'
import { ChatListItem } from '../ChatListItem'
import { ChatList } from '../ChatList'

type SearchResultsProps = {
  local: Chat[]
  // global: SearchItemProps[]
}

export type SearchItemProps = {
  id: number
  avatar: string
  name: string
  identifier: string
  type: ChatType
  profile: any
}

export const SearchResults: FC<SearchResultsProps> = ({
  local,
  global = [],
}) => {
  return (
    <div className="flex h-[calc(100%-60px)] flex-col overflow-auto">
      {/* <LOCAL SEARCH RESULTS> */}
      <div>
        <ChatList items={local} />
      </div>
      {/* </LOCAL SEARCH RESULTS> */}

      {/* <GlobalSearchResults global={global}/> */}
    </div>
  )
}

type LocalSearchResultsProps = {
  chats: Chat[]
}

const LocalSearchResults: FC<LocalSearchResultsProps> = ({ chats }) => {
  return (
    <div>
      <ChatList
        items={chats.map((chat) => ({
          id: chat.id,
          name: chat.name || '',
          type: chat.type,
          avatar: chat.avatar,
          lastMessage: chat.lastMessage,
          unreadMessagesCount: chat.unreadMessagesCount,
          identifier: null,
          variant: 'default',
        }))}
      />
    </div>
  )
}

// const GlobalSearchResults = ({ global }: { global: SearchItemProps }) => {
//   if (! global ) {
//     return null
//   }

//   return (
//     <div className="flex flex-col">
//       <div className="bg-gray-100 px-4 py-2 text-sm font-light text-gray-400">
//         Global search results
//       </div>
//       <ul>
//         {global.map((item) => (
//           <ChatListItem
//             key={item.id}
//             id={item.id}
//             type={item.type}
//             name={item.profile.name}
//             avatar={item.avatar}
//             identifier={''}
//           />
//         ))}
//       </ul>
//     </div>
//     </div>
//   )
// }
