import { makeAutoObservable } from "mobx"
import { makePersistable } from "mobx-persist-store";

import { AuthStore } from "@/shared/modules/auth";
import { SearchStore } from "@/modules/search";

import { Chat, Message } from "./chats.types";
import { getInterlocutorInPersonalChat } from "./chats.utils";


export class ChatsStore {
  authStore: AuthStore;
  searchStore: SearchStore;

  currentChatId: number | null = null
  chats: {[key: number]: Chat} = {}
  messages: {[key: number]: Message[]} = {}
  unreadMessages: {[key: number]: Set<number>} = {}
  drafts: {[key: number]: string} = {}

  isOpenedDetails: boolean = false
  isScrolledDown: boolean = false

  isVirtual: boolean = false
  currentUserId: number | null = null

  constructor(authStore: AuthStore, searchStore: SearchStore) {
    this.authStore = authStore;
    this.searchStore = searchStore;

    makeAutoObservable(this);
    makePersistable(this, {
      name: 'ChatsStore',
      properties: [
        'isOpenedDetails',
        // 'currentChatId',
        'drafts'
      ],
      storage: window.localStorage
    })
  }

  get filteredChatsList() {
    const query = this.searchStore.query.toLowerCase()
    if (!query) {
      return Object.values(this.chats); 
    }

    const chats = Object.values(this.chats).filter(chat => {
      if (chat.type === 'PERSONAL') {
        const interlocutor = getInterlocutorInPersonalChat(this.authStore.userId, chat)
        const username = interlocutor.user.username
        const name = interlocutor.user.profile.name.toLowerCase()

        return username?.includes(query) || name.includes(query)
      }

      const name = chat.name?.toLowerCase()
      const link = chat.link?.toLowerCase()

      return name?.includes(query) || link?.includes(query)
    })

    return chats
  }

  get currentChat() {
    return this.currentChatId? this.chats[this.currentChatId] : null;
  }

  get currentChatName() {
    if (this.currentChat?.type === "PERSONAL") {
      return this.currentInterlocutor?.user.profile.name
    }

    return this.currentChatId? this.chats[this.currentChatId].name : null;
  }

  get currentChatDescription() {
    if (this.currentChat?.type === "PERSONAL") {
      return this.currentInterlocutor?.user.profile.biography
    }

    return this.currentChatId ? this.chats[this.currentChatId].description : null;
  }

  get currentChatAvatar() {
    return this.currentChatId ? this.chats[this.currentChatId].avatar : null;
  }

  get currentChatMessages() {
    return this.currentChatId ? this.messages[this.currentChatId]: [];
  }

  get currentChatUnreadMessages() {
    return this.currentChatId ? this.unreadMessages[this.currentChatId] : new Set<number>();
  }

  get currentInterlocutor() {
    if (!this.currentChat) {
      return null;
    }

    const interlocutor = getInterlocutorInPersonalChat(this.authStore.userId, this.currentChat)

    return interlocutor
  }

  get currentDraftMessage() {
    return this.currentChatId? this.drafts[this.currentChatId] : null;
  } 

  openDetails() {
    this.isOpenedDetails = true;
  }

  closeDetails() {
    this.isOpenedDetails = false
  }

  toggleDetails() {
    this.isOpenedDetails = !this.isOpenedDetails;
  }

  setCurrentChatId(chatId: number) {
    this.currentChatId = chatId;

    this.isVirtual = false;
    this.currentUserId = null;
  }

  resetCurrentChatId() {
    this.currentChatId = null;
  }

  setChats(chats: Array<Chat>) {
    let chatsHashmap: {[key: number]: Chat} = {}

    chats.forEach(chat => {
      chatsHashmap[chat.id] = chat
      this.unreadMessages[chat.id] = new Set(chat.unreadMessages.map(c => c.messageId))
    })

    this.chats = chatsHashmap;
  }

  addChat(chat: Chat) {
    this.chats[chat.id] = chat;
    this.unreadMessages[chat.id] = new Set(chat.unreadMessages.map(c => c.messageId))
  }

  setMessages(chatId: number, messages: Array<Message>) {
    this.messages[chatId] = messages
  }
  
  addMessage(chatId: number, message: Message) {
    this.chats[chatId] = {...this.chats[chatId], lastMessage: message}
    this.messages[chatId] = this.messages[chatId] ? this.messages[chatId].concat(message) : [message]
  }

  addUnreadMessage(chatId: number, message: Message) {
    this.addMessage(chatId, message)

    if (!this.isScrolledDown) {
      this.chats[chatId].unreadMessages.push({messageId: message.id})
      this.unreadMessages[chatId].add(message.id)
    }
  }

  setVirtualChat(userId: number) {
    this.currentChatId = null
    this.isVirtual = true
    this.currentUserId = userId
  }

  setIsScrolledDown = (value: boolean) => {
    this.isScrolledDown = value
  }

  resetCurrentChatUnreadMessages = () => {
    if (!this.currentChatId) {
      return 
    }
    
    this.chats[this.currentChatId] = {...this.chats[this.currentChatId], unreadMessages: []}
    this.unreadMessages[this.currentChatId] = new Set()
  }
}