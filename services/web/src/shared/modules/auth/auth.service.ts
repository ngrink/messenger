import { AuthAPI } from "./auth.api";
import { LoginRequest } from "./auth.types";


export class AuthService {
  static async login(data: LoginRequest) {
    const { account, accessToken } = await AuthAPI.login(data)

    localStorage.setItem("access_token", accessToken)
    localStorage.setItem("account", JSON.stringify(account))
  }
}