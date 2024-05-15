import { User } from "@/shared/modules/users";

export enum ChatType {
  PERSONAL = "PERSONAL",
  GROUP = "GROUP",
  CHANNEL = "CHANNEL",
}

export enum MemberRole {
  OWNER,
  ADMIN,
  USER
}

export enum AttachmentType {
  PHOTO,
  VIDEO,
  AUDIO,
  DOCUMENT,
  PRESENTATION,
  SPREADSHEET,
  ARCHIVE,
  FILE,
}

export type Chat = {
  id: number;
  type: ChatType;
  public: boolean;
  createdAt: string;
  members: Member[];
  
  name?: string;
  description?: string;
  avatar?: string;
  link?: string;
  unreadMessagesCount?: number;
  lastMessage?: {
    id: number;
    chatId: number;
    userId: number;
    createdAt: string;
    text: string;
  }
}

export type Member = {
  chatId: number;
  userId: number;
  role: MemberRole;
  createdAt: string
  user: User;
}

export type Message = {
  id: number;
  chatId: number;
  userId: number;
  text: string;
  createdAt: string;
  attachments: Attachment[]
}

export type Attachment = {
  id: number;
  messageId: number;
  type: AttachmentType
  content: string;
}

