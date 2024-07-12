import { FC } from 'react'
import { FaFile } from 'react-icons/fa'

import { formatFileSize } from '@/shared/utils/formatFileSize'

export type FileAttachmentGroupProps = {
  data: FileAttachmentProps[]
}

export type FileAttachmentProps = {
  src: string
  name: string
  size: number
}

export const FileAttachmentGroup: FC<FileAttachmentGroupProps> = ({ data }) => {
  if (data.length === 0) {
    return null
  }

  return (
    <ul className="flex flex-col gap-2">
      {data.map((item) => (
        <li key={item.src}>
          <FileAttachment src={item.src} name={item.name} size={item.size} />
        </li>
      ))}
    </ul>
  )
}

export const FileAttachment: FC<FileAttachmentProps> = ({
  src,
  name,
  size,
}) => {
  return (
    <div>
      <a
        className="flex items-center gap-2.5"
        href={src}
        target="_blank"
        download
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-300">
          <FaFile size={16} />
        </div>
        <div className="flex flex-col">
          <span className="text-[13px] font-medium">{name}</span>
          <span className="text-xs font-normal text-gray-400">
            {formatFileSize(size, true)}
          </span>
        </div>
      </a>
    </div>
  )
}
