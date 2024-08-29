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
  unreadMessages: UnreadMessage[];

  name?: string;
  description?: string;
  avatar?: string;
  link?: string;
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
  author: {
    profile: {
      name: string;
      avatar: string;
    }
  }
}

export type UnreadMessage = {
  messageId: number;
}

export type Attachment = {
  id: number;
  messageId: number;
  type: string;
  mimetype: string
  size: number;
  originalName: string;
  location: string;
}
