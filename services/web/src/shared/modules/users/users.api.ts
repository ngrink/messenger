import { $axios } from "@/config";
import { CreateUserRequest } from "./users.types";

export class UsersAPI {
  static async register(data: CreateUserRequest) {
    await $axios.post('/users', data)
  }
}