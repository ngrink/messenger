import { $axios } from "@/config";
import { LoginRequest, LoginResponse, GetAuthUserResponse } from "./auth.types";

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
