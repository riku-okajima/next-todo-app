import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setCookie } from 'nookies';
import { COOKIE_NAME } from '../../constants/cookie';
import { apis } from '../../services/auth';
import { LoginResponse } from '../../services/payload/response/auth';
import { IThunk } from '../models/thunk';

export interface AuthState {
  authToken: string;
}

export const initialState: AuthState = {
  authToken: '',
};

export interface ILogin {
  mailAddress: string;
  password: string;
}

export const login = createAsyncThunk<LoginResponse, ILogin, IThunk>(
  'auth/login',
  async (params, { rejectWithValue }) => {
    try {
      const { mailAddress, password } = params;
      const response = await apis.login({ mailAddress, password });
      setCookie(null, COOKIE_NAME.auth, response.data.id, { maxAge: 1800, path: '/' });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      const { id } = payload;
      state.authToken = id;
    });
  },
});

export default slice.reducer;
export const { clearState } = slice.actions;
