import { FC, useState } from 'react'
import cl from './ImageAttachment.module.scss'

export type ImageAttachmentGroupProps = {
  data: ImageAttachmentProps[]
}

export type ImageAttachmentProps = {
  src: string
}

export const ImageAttachmentGroup: FC<ImageAttachmentGroupProps> = ({
  data,
}) => {
  if (data.length === 0) {
    return null
  }

  const [isSliderOpen, setIsSliderOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openSlider = (index: number) => {
    setCurrentImageIndex(index)
    setIsSliderOpen(true)
  }

  const closeSlider = () => {
    setCurrentImageIndex(0)
    setIsSliderOpen(false)
  }

  return (
    <div className={cl.gallery}>
      <ul className={cl.galleryList} data-length={data.length}>
        {data.map((item, i) => (
          <li
            className={cl.galleryItem}
            data-index={i + 1}
            key={item.src}
            onClick={() => openSlider(i)}
          >
            <ImageAttachment src={item.src} />
          </li>
        ))}
      </ul>
      <Slider
        data={data}
        current={currentImageIndex}
        isOpen={isSliderOpen}
        close={closeSlider}
      />
    </div>
  )
}

export const ImageAttachment: FC<ImageAttachmentProps> = ({ src }) => {
  return (
    <div className="h-full w-full bg-[#333]">
      <img src={src} className="h-full w-full object-cover" />
    </div>
  )
}

type SliderProps = {
  data: ImageAttachmentProps[]
  current: number
  isOpen: boolean
  close: () => void
}

export const Slider: FC<SliderProps> = ({ data, current, isOpen, close }) => {
  return (
    <div className="fixed left-0 top-0 z-[100] h-screen w-screen bg-[#030b16] bg-opacity-15 px-32 py-32">
      <ul className="h-full w-full">
        <li className="aspect-video h-full w-full" key={data[current].src}>
          <img src={data[current].src} className="h-full w-full object-cover" />
        </li>
      </ul>
    </div>
  )
}
