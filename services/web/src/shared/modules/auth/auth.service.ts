import { store } from "@/config";
import { AuthAPI, LoginRequest } from "./auth.api";

export class AuthService {
  static async login(data: LoginRequest) {
    const { accessToken } = await AuthAPI.login(data)
    store.authStore.setToken(accessToken)

    const { user } = await this.getAuthUser()
    store.authStore.setAuth(user, accessToken)
  }

  static async logout() {
    store.authStore.resetAuth()
  }

  static async getAuthUser() {
    return await AuthAPI.getAuthUser()
  }
}