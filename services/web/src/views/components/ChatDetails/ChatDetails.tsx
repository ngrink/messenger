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
import { Button } from '../ui/button'

export const ChatDetails = () => {
  return (
    <div>
      <div className="header">
        <div style={{ display: 'flex', padding: 20 }} className="user-info">
          <div className="avatar">
            <img
              style={{ height: 50, width: 50, borderRadius: 30 }}
              src="https://sun9-19.userapi.com/s/v1/ig2/ol23fGKPEmprhYjCqEPsXyuYpvlmvnynD8J4DI80pRsE5eRxFZQWekTE_J-58Bbk8Hs5k2JYtv2d60Xs3bXLOuGs.jpg?size=50x50&quality=95&crop=1,0,1478,1478&ava=1"
            />
          </div>
          <div style={{ marginLeft: 10 }} className="user-data">
            <div className="user-login">Ruslan Kolyvanov</div>
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
