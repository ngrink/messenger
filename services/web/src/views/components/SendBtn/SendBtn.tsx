import { FC } from 'react'

type SendBtnProps = {
  onClick: () => void
}

export const SendBtn: FC<SendBtnProps> = ({ onClick }) => {
  return (
    <button
      className="mx-2 h-6 w-6 cursor-pointer border-none outline-none hover:border-none hover:outline-none focus:outline-none"
      onClick={onClick}
    >
      <img src="/assets/icons/send-message.png" />
    </button>
  )
}
