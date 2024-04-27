import { $axios } from "@/config";
import { LoginRequest, LoginResponse } from "./auth.types";

export class AuthAPI {
  static async login(data: LoginRequest) {
    const res = await $axios.post<LoginResponse>('/auth/login', data)

    return res.data
  }
}