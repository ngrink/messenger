import { makeAutoObservable } from "mobx"
import { makePersistable } from "mobx-persist-store";

import { User } from "@/shared/modules/users";
import { Chat } from "@/modules/chats";
import { SearchResults } from "./search.types";

export class SearchStore {
  query: string = ""
  isFetching: boolean = false

  users: User[] = []
  chats: Chat[] = []
  messages: any[] = []

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'SearchStore',
      properties: [
        'query',
      ],
      storage: window.localStorage
    })
  }

  setQuery(query: string) {
    this.query = query
  }

  resetQuery() {
    this.query = ""
  }

  setResults(results: SearchResults) {
    this.users = results.users
    this.chats = results.chats
    this.messages = results.messages
  }

  resetResults() {
    this.users = []
    this.chats = []
    this.messages = []
  }

  setIsFetching(value: boolean) {
    this.isFetching = value
  }

  removeUser(userId: number) {
    this.users = this.users.filter(user => user.id !== userId)
  }
}