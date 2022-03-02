import { AppDispatch, RootState } from '../store';

export interface IThunk {
  dispatch: AppDispatch;
  state: RootState;
}
