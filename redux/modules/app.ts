import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ToastMessageValue, TOAST_MESSAGE } from '../../constants/toastMessage';
import { isValidationError } from '../../logics/isValidationError';

export interface AppState {
  isLoading: boolean;
  toastMessage: ToastMessageValue | null;
  validationMessages: Array<string>;
}

export const initialState: AppState = {
  isLoading: false,
  toastMessage: null,
  validationMessages: [],
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    clearState: () => initialState,
    setLoading: (state, { payload }: { payload: boolean }) => {
      state.isLoading = payload;
    },
    setToastMessage: (state, { payload }: { payload: ToastMessageValue | null }) => {
      state.toastMessage = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.isLoading = true;
        state.validationMessages = [];
      }
    ),
      builder.addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.isLoading = false;
          state.validationMessages = [];
        }
      ),
      builder.addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, { payload }) => {
          state.isLoading = false;
          if (!axios.isAxiosError) state.toastMessage = TOAST_MESSAGE.NETWORK_ERROR;
          if (payload.code === 'ECONNABORTED') state.toastMessage = TOAST_MESSAGE.TIMEOUT_ERROR;
          if (isValidationError(payload)) {
            state.validationMessages = !payload.response ? [] : payload.response.data.validationMessages;
          }
        }
      );
  },
});

export default slice.reducer;
export const { clearState, setLoading, setToastMessage } = slice.actions;
