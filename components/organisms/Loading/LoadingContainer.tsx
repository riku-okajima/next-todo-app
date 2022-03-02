import * as React from 'react';
import { useSelector } from '../../../redux/store';
import LoadingPresentation from './LoadingPresentation';

const Loading = (): JSX.Element => {
  const isLoading = useSelector((state) => state.app.isLoading);

  return <LoadingPresentation isLoading={isLoading} />;
};

export default Loading;
