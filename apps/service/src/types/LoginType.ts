export interface ServiceLoginRequest {
  phone: string;
  password: string;
}

export interface ServiceLoginResponse {
  accessToken: string;
  refreshToken: string;
}
