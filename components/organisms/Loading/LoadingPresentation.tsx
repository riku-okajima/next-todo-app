import { Backdrop, CircularProgress, createStyles, makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);

interface Props {
  isLoading: boolean;
}

const LoadingPresentation = ({ isLoading }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingPresentation;
