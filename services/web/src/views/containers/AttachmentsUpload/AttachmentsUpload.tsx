import { ChangeEvent, FC, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { MdDelete } from 'react-icons/md'

import { Input } from '../../components/ui/input'

type AttachmentsUploadProps = {
  onSend: (text: string, attachments: File[]) => void
}

export const AttachmentsUpload: FC<AttachmentsUploadProps> = ({ onSend }) => {
  const [attachments, setAttachments] = useState<File[]>([])
  const id = useId()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...e.target.files])
    } else {
      setAttachments([])
    }
  }

  return (
    <>
      <label htmlFor={id}>
        <div className="flex items-center rounded-md border-none px-2 py-2 opacity-70 hover:bg-gray-100 hover:opacity-100">
          <img src={'/assets/icons/attachment.svg'} />
        </div>
        <input id={id} type="file" onChange={onChange} multiple hidden />
      </label>

      {createPortal(
        <AttachmentsUploadModal
          attachments={attachments}
          setAttachments={setAttachments}
          onSend={onSend}
        />,
        document.body
      )}
    </>
  )
}

type AttachmentsUploadModalProps = {
  attachments: File[]
  setAttachments: (attachments: File[]) => void
  onSend: (text: string, attachments: File[]) => void
}

export const AttachmentsUploadModal: FC<AttachmentsUploadModalProps> = ({
  attachments,
  setAttachments,
  onSend,
}) => {
  const [caption, setCaption] = useState<string>('')
  const addBtnId = useId()

  const onAdd = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...e.target.files])
    }
  }

  const onDelete = (name: string) => {
    setAttachments(attachments.filter((attachment) => attachment.name !== name))
  }

  const onSendMessage = () => {
    onSend(caption, attachments)
    setAttachments([])
    setCaption('')
  }

  const onCancel = () => {
    setAttachments([])
    setCaption('')
  }

  if (!attachments.length) {
    return null
  }

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-8">
      <div className="w-full max-w-sm rounded-md bg-white px-6 py-4">
        <div className="flex flex-col gap-2">
          {/* HEADER*/}
          <div className="flex justify-between pb-2">
            <div className="font-medium">
              {`${attachments.length} ${attachments.length > 1 ? 'files' : 'file'} selected`}
            </div>
          </div>
          {/* PREVIEW*/}
          <ul className="flex max-h-[500px] flex-col gap-1 overflow-y-auto">
            {attachments.map((attachment) => (
              <li
                key={attachment.name}
                className="w-full overflow-hidden rounded-sm"
              >
                <img
                  className=""
                  src={window.URL.createObjectURL(attachment)}
                  alt=""
                />
                <ul className="absolute right-1.5 top-1.5 flex items-center rounded-sm bg-black bg-opacity-40 p-1">
                  <button
                    onClick={() => onDelete(attachment.name)}
                    className="border-none hover:border-none"
                  >
                    <MdDelete color="white" />
                  </button>
                </ul>
              </li>
            ))}
          </ul>
          {/* CAPTION */}
          <div>
            <span className="text-xs font-medium text-sky-600">Caption</span>
            <Input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          {/* ACTIONS */}
          <div className="flex items-center justify-between">
            <div className="-ml-3">
              <label htmlFor={addBtnId}>
                <div className="inline-flex h-9 cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-sky-600 transition-colors hover:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Add
                </div>
                <input
                  id={addBtnId}
                  type="file"
                  onChange={onAdd}
                  multiple
                  hidden
                />
              </label>
            </div>
            <div className="-mr-3">
              <div
                onClick={onCancel}
                className="inline-flex h-9 cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-sky-600 transition-colors hover:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                Cancel
              </div>
              <div
                onClick={onSendMessage}
                className="inline-flex h-9 cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-sky-600 transition-colors hover:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                Send
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
