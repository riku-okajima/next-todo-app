import { CssBaseline, MuiThemeProvider, StylesProvider } from '@material-ui/core';
import { AppProps } from 'next/app';
import { parseCookies } from 'nookies';
import * as React from 'react';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from '../components/organisms/Loading/LoadingContainer';
import ToastMessage from '../components/organisms/ToastMessage/ToastMessageContainer';
import { COOKIE_NAME } from '../constants/cookie';
import store, { persistor } from '../redux/store';
import theme from '../styles/theme';

export default function App({ Component, pageProps, router }: AppProps): JSX.Element {
  const cookies = parseCookies();

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    if (router.pathname === '/login' || router.pathname === '/_error') return;
    if (!cookies[COOKIE_NAME.auth]) router.push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    require('../mocks');
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
            <Loading />
            <ToastMessage />
          </MuiThemeProvider>
        </StylesProvider>
      </PersistGate>
    </Provider>
  );
}
