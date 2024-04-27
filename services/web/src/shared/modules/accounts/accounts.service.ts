import { AccountsAPI } from "./accounts.api";
import { CreateAccountRequest } from "./accounts.types";


export class AccountService {
  static async register(data: CreateAccountRequest) {
    await AccountsAPI.register(data)
  }
}