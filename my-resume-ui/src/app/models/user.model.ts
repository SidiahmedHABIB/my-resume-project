export interface UserModel {
  id: string;
  fname: string;
  lname: string;
  score: number;
  email: string;
  password: string;
  token: string;
}

export interface LoginResponse {
  userId: string;
  message: string;
  fname: string;
  lname: string;
  score: number;
}

export interface UserProfile {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
}
