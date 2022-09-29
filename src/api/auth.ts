import axios from './axiosInstance';
import { User, EmptyResponse } from './common';

// ========================// Register //======================== //

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
}

export const register = (req: RegisterRequest) => axios.post<RegisterResponse>('/auth/register', req);

// ========================// Login //======================== //

export interface LoginRequest {
  username?: string;
  email?: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  unreadCount: number;
}

export const login = (req: LoginRequest) => axios.post<LoginResponse>('/auth/login', req);

// ========================// AutoLogin //======================== //

export interface AutoLoginRequest {
  refreshToken: string;
}

export interface AutoLoginResponse {
  user: User;
  accessToken: string;
  unreadCount: number;
}

export const autoLogin = (req: AutoLoginRequest) => axios.post<AutoLoginResponse>('/auth/autologin', req);

// ========================// Refresh //======================== //

interface RefreshTokenRequest {
  refreshToken: string;
}

interface RefreshTokenResponse {
  accessToken: string;
}

export const refresh = (req: RefreshTokenRequest) => axios.post<RefreshTokenResponse>('/auth/refresh', req);

// ========================// Logout //======================== //

export interface LogoutRequest {
  refreshToken: string;
}

export const logout = (req: LogoutRequest) => axios.post<EmptyResponse>('/auth/logout', req);
