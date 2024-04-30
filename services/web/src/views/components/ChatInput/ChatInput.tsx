import { AttachmentBtn } from '../AttachmentBtn'
import { SendBtn } from '../SendBtn/SendBtn'
import { Input } from '../ui/input'

export const ChatInput = () => {
  return (
    <div className="flex items-center gap-2 px-3 py-2">
      <AttachmentBtn />
      <Input type="text" placeholder="Write a message..." className="" />
      <SendBtn />
    </div>
  )
}
