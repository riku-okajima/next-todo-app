import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setToastMessage } from '../../../redux/modules/app';
import { AppDispatch, useSelector } from '../../../redux/store';
import ToastMessagePresentation from './ToastMessagePresentation';

const ToastMessage = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const toastMessage = useSelector((state) => state.app.toastMessage);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    dispatch(setToastMessage(null));
  };

  return <ToastMessagePresentation toastMessage={toastMessage} handleClose={handleClose}></ToastMessagePresentation>;
};

export default ToastMessage;
