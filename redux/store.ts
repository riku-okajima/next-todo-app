import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { PERSIST, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer from './modules/app';
import authReducer from './modules/auth';
import todoReducer from './modules/todo';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  todo: todoReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// 永続化設定されたReducerとして定義
const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [PERSIST],
    },
  }),
});
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
