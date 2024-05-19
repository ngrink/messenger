import { User } from "@/shared/modules/users"
import { Chat } from "@/modules/chats"

export type SearchResults = {
  users: User[],
  chats: Chat[],
  messages: any[]
}