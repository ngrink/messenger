export type Account = {
  id: number;
  email: string;
  username: string;
  profile: {
    avatar: string;
    name: string;
    desription: string;
  }
}

export type CreateAccountRequest = {
  name: string;
  email: string;
  password: string;
}

