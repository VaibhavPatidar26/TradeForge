export interface User {
  id: string;
  name: string;
  email: string;
  balance: string | number;
}

export interface AuthResponse {
  message: string;
  success: boolean;
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  success: false;
}
