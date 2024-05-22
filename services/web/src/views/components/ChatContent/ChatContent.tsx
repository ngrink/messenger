import { FC, useEffect, useRef, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

import useOnScreen from '@/shared/hooks/useOnScreen'
import { Message, MessageProps } from '../Message'

type ChatContentProps = {
  id: number
  messages: MessageProps[]
  unreadMessages: Set<number>
  onScrollChange: (isScrolledDown: boolean) => void
  onScrollDownBtn: () => void
}

export const ChatContent: FC<ChatContentProps> = ({
  id,
  messages,
  unreadMessages,
  onScrollChange,
  onScrollDownBtn,
}) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const firstUnreadMessageRef = useRef<null | HTMLDivElement>(null)

  const [firstUnreadMessageId, setFirstUnreadMessageId] = useState<number>(
    Math.min(...unreadMessages)
  )
  const isScrolledDown = useOnScreen(messagesEndRef)

  const ScrollToDown = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'auto',
      block: 'end',
      inline: 'end',
    })
  }

  const ScrollToUnread = () => {
    firstUnreadMessageRef.current?.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'end',
    })
  }

  const onScrollDownBtnDecorated = () => {
    onScrollDownBtn()
    ScrollToDown()
  }

  useEffect(() => {
    if (unreadMessages.size) {
      ScrollToUnread()
      setFirstUnreadMessageId(Math.min(...unreadMessages))
    } else {
      ScrollToDown()
    }
  }, [id])

  useEffect(() => {
    if (isScrolledDown && !unreadMessages) {
      ScrollToDown()
    }
  }, [messages])

  useEffect(() => {
    onScrollChange(isScrolledDown)
  }, [isScrolledDown])

  return (
    <div className="relative overflow-y-auto">
      <div className="flex flex-col gap-6 py-4">
        {messages &&
          messages.map((message) => {
            if (firstUnreadMessageId === message.id) {
              return (
                <li key={message.id} className="flex list-none flex-col gap-6">
                  <div
                    ref={firstUnreadMessageRef}
                    className="flex w-full justify-center bg-white px-1 py-2 text-sm text-sky-500"
                  >
                    New messages
                  </div>

                  <div className="list-none px-4">
                    <Message {...message} />
                  </div>
                </li>
              )
            }

            return (
              <li key={message.id} className="list-none px-4">
                <Message {...message} />
              </li>
            )
          })}
      </div>
      <ScrollDown
        visible={!isScrolledDown}
        unreadMessagesCount={unreadMessages.size}
        onClick={onScrollDownBtnDecorated}
      />
      <div ref={messagesEndRef} />
    </div>
  )
}

type ScrollDownProps = {
  visible: boolean
  unreadMessagesCount: number
  onClick: () => void
}

const ScrollDown: FC<ScrollDownProps> = ({
  visible,
  unreadMessagesCount,
  onClick,
}) => {
  return (
    <div
      hidden={!visible}
      onClick={onClick}
      className="sticky bottom-4 left-full h-11 w-11 -translate-x-2 cursor-pointer rounded-full bg-white shadow-lg transition-all  hover:bg-gray-200"
    >
      {!!unreadMessagesCount && (
        <div className="absolute -top-3 left-1/2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-sky-400 text-sm text-white">
          {unreadMessagesCount}
        </div>
      )}
      <div className="flex h-full w-full items-center justify-center">
        <FiChevronDown size={24} opacity={0.5} />
      </div>
    </div>
  )
}
