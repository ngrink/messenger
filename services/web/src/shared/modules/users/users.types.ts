export type User = {
  id: number;
  email: string;
  username: string;
  profile: {
    avatar: string;
    name: string;
    biography: string;
    birthdate: string;
  }
}

export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
}

