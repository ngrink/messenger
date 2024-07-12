import { $axios } from "@/config";
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

export class AuthAPI {
  static async login(data: LoginRequest) {
    const res = await $axios.post<LoginResponse>('/auth/login', data)

    return res.data
  }

  static async getAuthUser() {
    const res = await $axios.get<GetAuthUserResponse>('/auth/me')

    return res.data
  }
}