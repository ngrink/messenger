import { FC, useEffect, useRef, useState } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'

import { formatDuration } from '@/shared/utils/formatDuration'

export type AudioAttachmentGroupProps = {
  data: AudioAttachmentProps[]
}

export type AudioAttachmentProps = {
  src: string
  name: string
}

export const AudioAttachmentGroup: FC<AudioAttachmentGroupProps> = ({
  data,
}) => {
  if (data.length === 0) {
    return null
  }

  return (
    <ul className="flex flex-col gap-2">
      {data.map((item) => (
        <li key={item.src}>
          <AudioAttachment src={item.src} name={item.name} />
        </li>
      ))}
    </ul>
  )
}

export const AudioAttachment: FC<AudioAttachmentProps> = ({ src, name }) => {
  const audio = useRef<HTMLAudioElement>(null)

  const [isLoadedMetadata, setIsLoadedMetadata] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const handlePlay = () => {
    if (audio.current) {
      audio.current.play()
      setIsPlaying(true)
    }
  }

  const handlePause = () => {
    if (audio.current) {
      audio.current.pause()
      setIsPlaying(false)
    }
  }

  const handleToggle = () => {
    if (audio.current) {
      if (audio.current.paused) {
        handlePlay()
      } else {
        handlePause()
      }
    }
  }

  useEffect(() => {
    if (audio.current) {
      audio.current.addEventListener('loadedmetadata', () => {
        setIsLoadedMetadata(true)
      })
      audio.current.addEventListener('timeupdate', () => {
        if (audio.current) {
          setCurrentTime(audio.current.currentTime)
        }
      })
      audio.current.addEventListener('ended', () => {
        setIsPlaying(false)
        setCurrentTime(0)
      })
    }

    return () => {
      if (audio.current) {
        audio.current.removeEventListener('loadedmetadata', () => {})
        audio.current.removeEventListener('timeupdate', () => {})
        audio.current.removeEventListener('ended', () => {})
      }
    }
  }, [audio])

  return (
    <div>
      <div className="flex items-center gap-2.5">
        <button
          onClick={handleToggle}
          className="flex h-9 w-9 items-center justify-center rounded-full border-none bg-[#307ED6] outline-none focus:border-none focus:outline-none"
        >
          {!isPlaying ? (
            <FaPlay size={14} color="white" className="ml-0.5" />
          ) : (
            <FaPause size={14} color="white" />
          )}
        </button>
        <div className="flex flex-col">
          <a href={src} target="_blank" download>
            <span className="cursor-pointer text-[13px] font-medium hover:text-[#307ED6]">
              {name}
            </span>
          </a>
          <span className="text-xs font-normal text-gray-400">
            {`${formatDuration(currentTime)} / ${isLoadedMetadata ? formatDuration(audio.current?.duration || 0) : '--:--'}`}
          </span>
        </div>
      </div>
      <audio ref={audio} src={src} controls={false} preload="metadata" />
    </div>
  )
}
