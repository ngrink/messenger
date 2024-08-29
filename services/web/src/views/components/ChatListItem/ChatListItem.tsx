import { FC, FunctionComponent } from 'react'
import { observer } from 'mobx-react-lite'
import { MdGroup } from 'react-icons/md'

import { ChatType, UnreadMessage } from '@/modules/chats'
import { cn } from '@/shared/utils'
import { Avatar } from '../Avatar'

export type ChatListItemProps = {
  id: number
  type: ChatType
  name: string
  avatar?: string
  lastMessage?: {
    createdAt: string
    text: string
  }
  unreadMessages?: UnreadMessage[]
  identifier?: string
  variant?: 'default' | 'search'
  active: boolean
  onClick: (chatId: number) => void
}

export const ChatListItem: FunctionComponent<ChatListItemProps> = observer(
  ({
    id,
    type,
    name,
    avatar,
    lastMessage,
    unreadMessages,
    identifier,
    variant = 'default',
    active,
    onClick,
  }) => {
    const avatarFallback = name
      ? name
          .split(' ')
          .slice(0, 2)
          .map((item) => item[0])
          .join('')
      : ''

    const rootClassName = cn('flex w-full items-center gap-4 px-2.5 py-2', {
      'bg-sky-600': active,
      'hover:bg-neutral-100': !active,
    })

    return (
      <div className={rootClassName} onClick={() => onClick(id)}>
        <Avatar image={avatar} fallback={avatarFallback} />
        <div className="bg flex w-full flex-col gap-0.5 overflow-hidden">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <ChatTypeIcon type={type} active={active} />
              <span className={`${active ? 'text-gray-100' : ''}`}>{name}</span>
            </div>
            {variant === 'default' && lastMessage && (
              <div
                className={`text-xs ${active ? 'text-gray-200' : 'text-gray-400'}`}
              >
                {lastMessage.createdAt}
              </div>
            )}
          </div>
          <div className="flex w-full items-center justify-between gap-1">
            {variant === 'default' && lastMessage && (
              <div
                className={`overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-light ${active ? 'text-gray-200' : 'text-gray-500'}`}
              >
                {lastMessage.text}
              </div>
            )}

            {variant === 'search' && (
              <div
                className={`overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-light ${active ? 'text-gray-200' : 'text-gray-500'}`}
              >
                {identifier && `@${identifier}`}
              </div>
            )}

            {variant === 'default' && unreadMessages?.length ? (
              <UnreadMessagesBadge count={unreadMessages?.length} />
            ) : null}
          </div>
        </div>
      </div>
    )
  }
)

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

type ChatTypeIconProps = {
  type: ChatType
  active: boolean
}

const ChatTypeIcon: FC<ChatTypeIconProps> = ({ type, active }) => {
  if (type === ChatType.PERSONAL) {
    return null
  }

  return (
    <div>
      {type == ChatType.GROUP && <MdGroup color={active ? 'white' : 'black'} />}
      {type == ChatType.CHANNEL && !active && (
        <div className="h-3 w-3">
          <img src="/assets/icons/megaphone.png" />
        </div>
      )}
      {type == ChatType.CHANNEL && active && (
        <div className="h-3 w-3">
          <img src="/assets/icons/megaphone-white.png" />
        </div>
      )}
    </div>
  )
}
