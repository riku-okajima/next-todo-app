import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import * as React from 'react';
import { ToastMessageValue } from '../../../constants/toastMessage';

interface Props {
  toastMessage: ToastMessageValue | null;
  handleClose: () => void;
}

const ToastMessagePresentation = ({ toastMessage, handleClose }: Props): JSX.Element => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={toastMessage != null}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert elevation={6} variant="filled" severity={toastMessage?.severity}>
        {toastMessage?.message}
      </Alert>
    </Snackbar>
  );
};

export default ToastMessagePresentation;
