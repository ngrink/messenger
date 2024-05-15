import { SendBtn } from '../SendBtn/SendBtn'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export const ChatInput = () => {
  return (
    <div className="flex items-center gap-2 border border-gray-100 bg-white px-3 py-2">
      <AttachmentBtn />
      <Input type="text" placeholder="Write a message..." className="" />
      <SendBtn />
    </div>
  )
}

export const AttachmentBtn = () => {
  return (
    <Button
      variant={'outline'}
      className="border-none px-2 opacity-70 hover:bg-transparent hover:opacity-100"
    >
      <img src={'/assets/icons/attachment.svg'} />
    </Button>
  )
}
