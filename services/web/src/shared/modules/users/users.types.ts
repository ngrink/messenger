export type User = {
  id: number;
  email: string;
  profile: {
    name: string;
    avatar?: string;
    biography?: string;
    birthdate?: string;
  }
  username?: string;
}

export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
}

