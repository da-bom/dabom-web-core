export interface ServiceLoginRequest {
  phoneNumber: string;
  password: string;
}

export interface ServiceLoginResponse {
  accessToken: string;
  refreshToken: string;
}
