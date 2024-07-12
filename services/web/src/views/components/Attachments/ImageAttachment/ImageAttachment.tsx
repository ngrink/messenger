import { FC, useState } from 'react'

import { ImageSlider } from '../ImageSlider/ImageSlider'
import cl from './ImageAttachment.module.scss'

export type ImageAttachmentGroupProps = {
  data: ImageAttachmentProps[]
  author: {
    profile: {
      name: string
      avatar: string
    }
  }
  createdAt: string
}

export type ImageAttachmentProps = {
  src: string
}

export const ImageAttachmentGroup: FC<ImageAttachmentGroupProps> = ({
  data,
  author,
  createdAt,
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

  const nextSlide = () => {
    setCurrentImageIndex((prev) => (prev + 1) % data.length)
  }

  const prevSlide = () => {
    setCurrentImageIndex((prev) => (prev - 1 + data.length) % data.length)
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
      <ImageSlider
        data={data}
        author={author}
        createdAt={createdAt}
        current={currentImageIndex}
        isOpen={isSliderOpen}
        setCurrent={setCurrentImageIndex}
        prev={prevSlide}
        next={nextSlide}
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
