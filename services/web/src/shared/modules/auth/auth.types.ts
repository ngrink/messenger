import { Account } from "../accounts"

export type LoginRequest = {
  login: string
  password: string
}

export type LoginResponse = {
  account: Account
  accessToken: string
}

