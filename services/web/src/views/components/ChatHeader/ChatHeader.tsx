import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { HiOutlineDotsVertical, HiOutlineSearch } from 'react-icons/hi'
import { LuPanelRightOpen } from 'react-icons/lu'

import { useStore } from '@/config'
import { Button } from '../ui/button'

type ChatHeaderProps = {
  name: string
  description: string
}

export const ChatHeader: FC<ChatHeaderProps> = observer(
  ({ name, description }) => {
    const { chatsStore } = useStore()

    return (
      <div className="flex h-full w-full items-center justify-between border border-gray-100 bg-white px-4">
        {/* CHAT INFO */}
        <div className="">
          <div className="text-base font-medium">{name}</div>
          <div className="text-xs font-light text-gray-600">{description}</div>
        </div>

        {/* ACTIONS */}
        <div className="-mr-2 flex items-center gap-0 ">
          <Button
            variant={'ghost'}
            className="border-none px-3 opacity-60 hover:bg-transparent hover:opacity-100"
          >
            <HiOutlineSearch size={20} color="#606060" />
          </Button>

          <Button
            variant={'ghost'}
            className={`border-none px-3 hover:bg-transparent hover:opacity-100 ${chatsStore.isOpenedDetails ? 'opacity-100' : 'opacity-60'}`}
            onClick={() => {
              chatsStore.toggleDetails()
            }}
          >
            <LuPanelRightOpen
              size={20}
              color={chatsStore.isOpenedDetails ? 'rgb(2 132 199)' : '#606060'}
            />
          </Button>

          <Button
            variant={'ghost'}
            className="border-none px-3 opacity-60 hover:bg-transparent hover:opacity-100"
          >
            <HiOutlineDotsVertical size={20} color="#606060" />
          </Button>
        </div>
      </div>
    )
  }
)
