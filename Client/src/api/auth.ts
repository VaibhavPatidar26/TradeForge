import api from './axios';
import type { AuthResponse } from '../types';

export const authApi = {
  register: (name: string, email: string, password: string) =>
    api.post<AuthResponse>('/users/register', { name, email, password }),

  login: (email: string, password: string) =>
    api.post<AuthResponse>('/users/login', { email, password }),
};
