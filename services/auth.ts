import { AxiosResponse } from 'axios';
import axiosClient from './const/axiosClient';
import END_POINT from './const/endpoint';
import { LoginRequest } from './payload/request/auth';
import { LoginResponse } from './payload/response/auth';

const login = async (request: LoginRequest): Promise<AxiosResponse<LoginResponse>> => {
  return await axiosClient.post<LoginResponse>(END_POINT.AUTH_LOGIN, request);
};

const logout = async (): Promise<AxiosResponse<void>> => {
  return await axiosClient.post<void>(END_POINT.AUTH_LOGIN);
};

export const apis = {
  login,
  logout,
};
