import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TodoDetailResponse, TodoSearchResponse } from '../../services/payload/response/todo';
import { apis } from '../../services/todo';
import { IThunk } from '../models/thunk';

export interface TodoState {}

export const initialState: TodoState = {};

export const search = createAsyncThunk<TodoSearchResponse, undefined, IThunk>(
  'todo/search',
  async (params, { rejectWithValue }) => {
    try {
      const response = await apis.search({});
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const detail = createAsyncThunk<TodoDetailResponse, number, IThunk>(
  'todo/detail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apis.get(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const slice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    clearState: () => initialState,
  },
});

export default slice.reducer;
export const { clearState } = slice.actions;
