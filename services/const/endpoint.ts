const AUTH_END_POINT = 'auth';
const TODO_END_POINT = 'todo';

const END_POINT = {
  AUTH_LOGIN: `${AUTH_END_POINT}/login`,
  AUTH_LOGOUT: `${AUTH_END_POINT}/logout`,
  TODO_SEARCH: `${TODO_END_POINT}/search`,
  TODO_DETAIL: (id: number): string => `${TODO_END_POINT}/${id}/detail`,
  TODO_REGISTER: `${TODO_END_POINT}/register`,
  TODO_UPDATE: (id: number): string => `${TODO_END_POINT}/${id}/update`,
  TODO_DELETE: (id: number): string => `${TODO_END_POINT}/${id}/delete`,
};

export default END_POINT;
