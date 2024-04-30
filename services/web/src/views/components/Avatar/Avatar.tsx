import { FunctionComponent } from 'react'
import {
  Avatar as AvatarComponent,
  AvatarFallback,
  AvatarImage,
} from '../ui/avatar'
import { cn } from '@/shared/utils'

type AvatarProps = {
  fallback: string
  image?: string
  variant?: 'default' | 'small'
}

export const Avatar: FunctionComponent<AvatarProps> = ({
  image,
  fallback,
  variant,
}) => {
  const avatarClassname = cn({
    'h-11 w-11': variant === 'default' || variant === undefined,
    'h-8 w-8': variant === 'small',
  })

  return (
    <div className="relative">
      <AvatarComponent className={avatarClassname}>
        <AvatarImage src={image} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </AvatarComponent>
      {/* <div className="absolute bottom-0.5 right-0.5 z-[1000] h-2 w-2 rounded-full bg-green-500"></div> */}
    </div>
  )
}
