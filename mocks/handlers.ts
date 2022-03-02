import { rest } from 'msw';

import { LoginRequest } from '../services/payload/request/auth';
import { TodoSearchRequest } from '../services/payload/request/todo';
import { LoginResponse } from '../services/payload/response/auth';
import { TodoDetailResponse, TodoSearchResponse } from '../services/payload/response/todo';

export const handlers = [
  rest.post<LoginRequest, LoginResponse>('http://localhost:9080/api/auth/login', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: '1',
        mailAddress: 'admin@gmail.com',
        lastName: 'RPC',
        firstName: '太郎',
        role: 'admin',
      })
    );
  }),
  rest.post<TodoSearchRequest, TodoSearchResponse>('http://localhost:9080/api/todo/search', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        todoList: [
          {
            id: 1,
            title: 'title',
            memo: 'memo',
            reminderDate: new Date(2021, 1, 1),
            deadlineDate: new Date(2021, 1, 2),
            repeatType: 'repeatType',
            genre: 1,
            important: false,
          },
        ],
      })
    );
  }),
  rest.get<any, TodoDetailResponse>('http://localhost:9080/api/todo/:id/detail', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        title: 'title',
        memo: 'memo',
        reminderDate: new Date(2021, 1, 1),
        deadlineDate: new Date(2021, 1, 2),
        repeatType: 'repeatType',
        genre: 1,
        important: false,
      })
    );
  }),
  rest.get<any, TodoDetailResponse>('http://localhost:9080/api/todo/:id/detail', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        title: 'title',
        memo: 'memo',
        reminderDate: new Date(2021, 1, 1),
        deadlineDate: new Date(2021, 1, 2),
        repeatType: 'repeatType',
        genre: 1,
        important: false,
      })
    );
  }),
];
