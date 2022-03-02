import { TodoModel } from '../model/todo';

export interface TodoSearchResponse {
  todoList: Array<TodoModel>;
}

export type TodoDetailResponse = TodoModel;
