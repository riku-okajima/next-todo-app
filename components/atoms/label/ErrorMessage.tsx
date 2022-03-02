import { Typography } from '@material-ui/core';
import React from 'react';

const ErrorMessage = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <Typography color="error">{children}</Typography>;
};

export default ErrorMessage;
