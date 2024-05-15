import { makeAutoObservable } from "mobx"
import { makePersistable } from "mobx-persist-store";
import { User } from "../users";


export class AuthStore {
  isAuth: boolean = false
  user: User | null  = null
  accessToken: string | null = null

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'AuthStore',
      properties: [
        'isAuth',
        'user',
        'accessToken'
      ],
      storage: window.localStorage
    })
  }

  setAuth(user: User, accessToken: string) {
    this.user = user
    this.accessToken = accessToken
    this.isAuth = true
  }

  resetAuth() {
    this.isAuth = false
    this.accessToken = null
    this.user = null
  }
}