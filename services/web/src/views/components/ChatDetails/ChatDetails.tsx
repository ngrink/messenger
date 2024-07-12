import { FC } from 'react'
import {
  InfoCircledIcon,
  BellIcon,
  ImageIcon,
  Link1Icon,
  Share1Icon,
  Pencil1Icon,
  TrashIcon,
  HandIcon,
} from '@radix-ui/react-icons'

import { Switch } from '@/components/ui/switch'
import { cn } from '@/shared/utils'
import { Avatar } from '../Avatar'

type ChatDetailsProps = {
  name: string
  isHidden: boolean
  avatar?: string
}

export const ChatDetails: FC<ChatDetailsProps> = ({
  name,
  avatar,
  isHidden,
}) => {
  const rootClassname = cn(
    'z-[1000] transition-all shadow-[-2px_0_3px_0_rgba(0,0,0,0.1)] bg-white',
    {
      'flex-[0_1_400px]': isHidden,
      hidden: !isHidden,
    }
  )

  const avatarFallback = name
    ? name
        .split(' ')
        .slice(0, 2)
        .map((item) => item[0])
        .join('')
    : ''

  return (
    <div className={rootClassname}>
      <div className="header">
        <div style={{ display: 'flex', padding: 20 }} className="user-info">
          <Avatar image={avatar} fallback={avatarFallback} />
          <div style={{ marginLeft: 10 }} className="user-data">
            <div className="user-login">{name}</div>
            <div
              style={{ color: 'gray', fontSize: 14 }}
              className="user-last-seen"
            >
              last seen today at 20:10
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          minHeight: 7,
          backgroundColor: '#f7f7f7',
          boxShadow: 'inset 0px -1px 5px 2px rgba(0,0,0,0.1)',
        }}
        className="splitter"
      ></div>

      <div
        style={{
          padding: '10px 20px',
        }}
        className="body"
      >
        <div
          style={{ display: 'flex', alignItems: 'baseline' }}
          className="first-block"
        >
          <InfoCircledIcon />
          <div className="user-credentials">
            <div
              style={{ marginLeft: 10, paddingTop: 12 }}
              className="row-data"
            >
              +7 996 784 0841
              <div style={{ fontSize: 12, color: 'gray' }}>Mobile</div>
            </div>

            <div
              style={{ marginLeft: 10, paddingTop: 12 }}
              className="row-data"
            >
              <a href="#">@excelsen1or</a>
              <div style={{ fontSize: 12, color: 'gray' }}>Username</div>
            </div>

            <div
              style={{ marginLeft: 10, paddingTop: 12, paddingBottom: 12 }}
              className="row-data"
            >
              Sep 22, 2003 (20 years old)
              <div style={{ fontSize: 12, color: 'gray' }}>Date of birth</div>
            </div>
          </div>
        </div>

        <hr style={{ padding: 5, marginTop: 5 }}></hr>

        <div className="second-block">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <BellIcon />
            <div
              style={{ marginLeft: 10, paddingTop: 12, paddingBottom: 12 }}
              className="row-data w-full"
            >
              <div className="flex w-full items-center justify-between">
                <div>Notifications</div>
                <Switch className="hover:border-transparent focus:outline-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          minHeight: 7,
          backgroundColor: '#f7f7f7',
          boxShadow: 'inset 0px -1px 5px 2px rgba(0,0,0,0.1)',
        }}
        className="splitter"
      ></div>

      <div
        style={{
          padding: '10px 0px',
        }}
        className="media-info"
      >
        <div>
          <button
            style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}
            className="w-full rounded-none border-0 border-transparent px-5 py-2 hover:border-none hover:bg-gray-100"
          >
            <ImageIcon />
            <div style={{ marginLeft: 10 }}>1 photo</div>
          </button>
          <button
            style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}
            className="w-full rounded-none border-0 border-transparent px-5 py-2 hover:border-none hover:bg-gray-100"
          >
            <Link1Icon />
            <div style={{ marginLeft: 10 }}>1 shared link</div>
          </button>
        </div>
      </div>

      <div
        style={{
          minHeight: 7,
          backgroundColor: '#f7f7f7',
          boxShadow: 'inset 0px -1px 5px 2px rgba(0,0,0,0.1)',
        }}
        className="splitter"
      ></div>

      <div
        style={{
          padding: '10px 0px',
        }}
        className="footer"
      >
        <div>
          <button
            style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}
            className="w-full rounded-none border-0 border-transparent px-5 py-2 hover:border-none hover:bg-gray-100"
          >
            <Share1Icon />
            <div style={{ marginLeft: 10 }}>Share this contact</div>
          </button>
          <button
            style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}
            className="w-full rounded-none border-0 border-transparent px-5 py-2 hover:border-none hover:bg-gray-100"
          >
            <Pencil1Icon />
            <div style={{ marginLeft: 10 }}>Edit contact</div>
          </button>
          <button
            style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}
            className="w-full rounded-none border-0 border-transparent px-5 py-2 hover:border-none hover:bg-gray-100"
          >
            <TrashIcon />
            <div style={{ marginLeft: 10 }}>Delete account</div>
          </button>
          <button
            style={{
              color: 'red',
              display: 'flex',
              alignItems: 'center',
              marginBottom: 5,
            }}
            className="w-full rounded-none border-0 border-transparent px-5 py-2 hover:border-none hover:bg-gray-100"
          >
            <HandIcon />
            <div style={{ marginLeft: 10 }}>Block user</div>
          </button>
        </div>
      </div>
    </div>
  )
}
