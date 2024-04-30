import { FunctionComponent } from 'react'
import { cn } from '@/shared/utils'

import { Avatar } from '../Avatar'

export type ChatListItemProps = {
  chatId: number
  name: string
  lastMessageAt: string
  lastMessageText: string
  unreadMessagesCount: number
  active: boolean
  avatar?: string
}

export const ChatListItem: FunctionComponent<ChatListItemProps> = ({
  avatar,
  name,
  lastMessageAt,
  lastMessageText,
  unreadMessagesCount,
  active,
}) => {
  const avatarFallback = name
    .split(' ')
    .slice(0, 2)
    .map((item) => item[0])
    .join('')

  const rootClassName = cn('flex w-full items-center gap-4 px-2.5 py-2', {
    'bg-sky-600': active,
    'hover:bg-neutral-100': !active,
  })

  return (
    <div className={rootClassName}>
      <Avatar image={avatar} fallback={avatarFallback} />
      <div className="bg flex w-full flex-col gap-0.5 overflow-hidden">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm font-medium">
            <span className={`${active ? 'text-gray-100' : ''}`}>{name}</span>
            <div className="bottom-0.5 right-0.5 z-[1000] h-1 w-1 rounded-full bg-green-500"></div>
          </div>
          <div
            className={`text-xs ${active ? 'text-gray-200' : 'text-gray-400'}`}
          >
            {lastMessageAt}
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-1">
          <div
            className={`overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-light ${active ? 'text-gray-200' : 'text-gray-500'}`}
          >
            {lastMessageText}
          </div>
          <UnreadMessagesBadge count={unreadMessagesCount} />
        </div>
      </div>
    </div>
  )
}

type UnreadMessagesBadgeProps = {
  count: number
}

const UnreadMessagesBadge: FunctionComponent<UnreadMessagesBadgeProps> = ({
  count,
}) => {
  if (count === 0) {
    return null
  }

  return (
    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 p-2.5 text-xs text-white">
      {count}
    </div>
  )
}
