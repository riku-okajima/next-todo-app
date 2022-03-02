import { AxiosResponse } from 'axios';
import axiosClient from './const/axiosClient';
import END_POINT from './const/endpoint';
import { TodoRegisterRequest, TodoSearchRequest, TodoUpdateRequest } from './payload/request/todo';
import { TodoDetailResponse, TodoSearchResponse } from './payload/response/todo';

const search = async (request: TodoSearchRequest): Promise<AxiosResponse<TodoSearchResponse>> => {
  return await axiosClient.post<TodoSearchResponse>(END_POINT.TODO_SEARCH, request);
};
const get = async (id: number): Promise<AxiosResponse<TodoDetailResponse>> => {
  return await axiosClient.get<TodoDetailResponse>(END_POINT.TODO_DETAIL(id));
};
const register = async (request: TodoRegisterRequest): Promise<AxiosResponse<void>> => {
  return await axiosClient.post<void>(END_POINT.TODO_REGISTER, request);
};
const update = async (id: number, request: TodoUpdateRequest): Promise<AxiosResponse<void>> => {
  return await axiosClient.put<void>(END_POINT.TODO_UPDATE(id), request);
};
const erase = async (id: number): Promise<AxiosResponse<void>> => {
  return await axiosClient.delete<void>(END_POINT.TODO_DELETE(id));
};

export const apis = {
  search,
  get,
  register,
  update,
  erase,
};
