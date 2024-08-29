import { User } from "@/shared/modules/users";

export type LoginRequest = {
  login: string
  password: string
}

export type LoginResponse = {
  user: User
  accessToken: string
}

export type GetAuthUserResponse = {
  user: User
}
