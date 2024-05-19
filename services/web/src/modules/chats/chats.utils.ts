import { Chat } from "./chats.types"

export const getInterlocutorInPersonalChat = (userId: number, chat: Chat) => {
  if (chat.type != "PERSONAL") {
    throw new Error("Interlocutor doesn't exists in non personal chat")
  }

  const interlocutor = chat.members.filter((member) => {
    return member.userId != userId
  })[0]

  return interlocutor
}

// TODO
export const formatDate = (date: string) => {
  return date
}