import { UsersAPI } from "./users.api";
import { CreateUserRequest } from "./users.types";


export class UsersService {
  static async register(data: CreateUserRequest) {
    await UsersAPI.register(data)
  }
}