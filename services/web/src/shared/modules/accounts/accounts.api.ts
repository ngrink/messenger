import { $axios } from "@/config";
import { CreateAccountRequest } from "./accounts.types";

export class AccountsAPI {
  static async register(data: CreateAccountRequest) {
    await $axios.post('/accounts', data)
  }
}