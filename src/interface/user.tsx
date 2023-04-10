export interface IUser {
  _id?: number | string;
  name?: string;
  email: string;
  password?: string;
}

export interface ISignup {
  _id?: number | string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserToken {
  createdAt: string;
  email: string;
  name: string;
  password: string;
  role: string;
  updatedAt: string;
  _id: string;
}
