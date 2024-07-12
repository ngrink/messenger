import { FC, useState } from 'react'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'
import { MdClose, MdOutlineRotate90DegreesCcw } from 'react-icons/md'
import { TfiDownload } from 'react-icons/tfi'

import { ImageAttachmentProps } from '../ImageAttachment'

type ImageSliderProps = {
  data: ImageAttachmentProps[]
  author: {
    profile: {
      name: string
      avatar: string
    }
  }
  createdAt: string
  current: number
  isOpen: boolean
  setCurrent: (index: number) => void
  next: () => void
  prev: () => void
  close: () => void
}

export const ImageSlider: FC<ImageSliderProps> = ({
  data,
  author,
  createdAt,
  current,
  isOpen,
  setCurrent,
  next,
  prev,
  close,
}) => {
  const [rotations, setRotations] = useState(Array(data.length).fill(0))
  const rotationsClasses = [
    'rotate-0',
    'rotate-90',
    'rotate-180',
    'rotate-[270deg]',
  ]

  const rotate = (index: number) => {
    setRotations((prev) => {
      const newRotations = [...prev]
      newRotations[index] = (newRotations[index] + 1) % rotationsClasses.length
      return newRotations
    })
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed left-0 top-0 z-[100] flex h-screen w-screen items-center bg-[#030b16] bg-opacity-[.93] px-24 py-24"
      onClick={close}
    >
      <ul className="relative h-full w-full">
        {data.map((item, i) => (
          <li
            className={`absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 ${i == current ? 'opacity-100' : 'opacity-0'} ${rotationsClasses[rotations[i]]}`}
            key={item.src}
          >
            <img src={item.src} className="h-full w-full object-contain" />
          </li>
        ))}
      </ul>

      {/* FOOTER */}
      <div className="absolute bottom-0 left-0 flex h-16 w-full items-center justify-between px-4 text-sm text-white">
        {/* FOOTER__META */}
        <div>
          <div className="font-medium">
            Photo {current + 1} of {data.length}
          </div>
          <div className="flex gap-2 font-normal">
            <span>{author.profile.name}</span>
            <span>{createdAt}</span>
          </div>
        </div>
        {/* FOOTER__THUMBS */}
        <div className="absolute left-1/2 h-full -translate-x-1/2 ">
          <ul className="flex h-full gap-2 py-2">
            {data.map((item, i) => (
              <li
                className={`h-full cursor-pointer transition-all  ${current == i ? 'w-[100px]' : 'w-[45px]'}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrent(i)
                }}
              >
                <img src={item.src} className="h-full w-full object-cover" />
              </li>
            ))}
          </ul>
        </div>
        {/* FOOTER__ACTIONS */}
        <div className="flex gap-4">
          <a href={data[current].src} target="_blank" download>
            <TfiDownload color="white" size={18} />
          </a>
          <button
            onClick={(e) => {
              e.stopPropagation()
              rotate(current)
            }}
          >
            <MdOutlineRotate90DegreesCcw color="white" size={20} />
          </button>
        </div>
      </div>

      {/* CONTROLS */}
      <div
        className="absolute left-4 cursor-pointer rounded-full p-2 hover:bg-white hover:bg-opacity-5"
        onClick={(e) => {
          e.stopPropagation()
          prev()
        }}
      >
        <GoChevronLeft color="white" size={32} />
      </div>
      <div
        className="absolute right-4 cursor-pointer rounded-full p-2 hover:bg-white hover:bg-opacity-5"
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}
      >
        <GoChevronRight color="white" size={32} />
      </div>
      <div className="absolute right-4 top-4 cursor-pointer rounded-full p-2 hover:bg-white hover:bg-opacity-5">
        <MdClose
          color="white"
          className="opacity-70"
          size={24}
          onClick={(e) => {
            e.stopPropagation()
            close()
          }}
        />
      </div>
    </div>
  )
}
