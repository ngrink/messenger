import { makeAutoObservable } from "mobx"
import { makePersistable } from "mobx-persist-store";

import { AuthStore } from "@/shared/modules/auth/auth.store";
import { Chat, Message } from "./chats.types";


export class ChatsStore {
  authStore: AuthStore;

  isOpenedDetails: boolean = false
  currentChatId: number | null = null
  chats: {[key: number]: Chat} = {}
  messages: {[key: number]: Message[]} = {}

  constructor(authStore: AuthStore) {
    this.authStore = authStore;

    makeAutoObservable(this);
    makePersistable(this, {
      name: 'ChatsStore',
      properties: [
        'isOpenedDetails',
        // 'currentChatId'
      ],
      storage: window.localStorage
    })
  }


  get chatsList() {
    return Object.values(this.chats); 
  }

  get currentChat() {
    return this.currentChatId? this.chats[this.currentChatId] : null;
  }

  get currentChatName() {
    if (this.currentChat?.type === "PERSONAL") {
      return this.currentInterlocutor.user.profile.name
    }

    return this.currentChatId? this.chats[this.currentChatId].name : null;
  }

  get currentChatDescription() {
    if (this.currentChat?.type === "PERSONAL") {
      return this.currentInterlocutor.user.profile.biography
    }

    return this.currentChatId? this.chats[this.currentChatId].description : null;
  }

  get currentChatAvatar() {
    return this.currentChatId? this.chats[this.currentChatId].avatar : null;
  }

  get currentChatMessages() {
    return this.currentChatId? this.messages[this.currentChatId]: [];
  }

  get currentInterlocutor() {
    if (!this.currentChat) {
      return null;
    }

    if (this.currentChat?.type != "PERSONAL") {
      throw new Error("Interlocutor doesn't exists in non personal chat")
    }

    const interlocutor = this.currentChat?.members.filter((member) => {
      return member.userId != this.authStore.user?.id
    })[0]

    return interlocutor
  }

  openDetails() {
    this.isOpenedDetails = true;
  }

  closeDetails() {
    this.isOpenedDetails = false;
  }

  toggleDetails() {
    this.isOpenedDetails = !this.isOpenedDetails;
  }

  setCurrentChatId(chatId: number) {
    this.currentChatId = chatId;
  }

  resetCurrentChatId() {
    this.currentChatId = null;
  }

  setChats(chats: Array<Chat>) {
    let chatsHashmap: {[key: number]: Chat} = {}

    chats.forEach(chat => {
      chatsHashmap[chat.id] = chat
    })

    this.chats = chatsHashmap;
  }

  setMessages(chatId: number, messages: Array<Message>) {
    this.messages[chatId] = messages;
  }
}