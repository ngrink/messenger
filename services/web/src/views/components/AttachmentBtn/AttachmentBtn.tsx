import { Button } from '../ui/button'

export const AttachmentBtn = () => {
  return (
    <Button
      variant={'outline'}
      className="border-none px-2 opacity-70 hover:bg-transparent hover:opacity-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#757575"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-paperclip outline-none"
      >
        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
      </svg>
    </Button>
  )
}
