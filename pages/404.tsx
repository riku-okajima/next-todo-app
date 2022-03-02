import { Grid } from '@material-ui/core';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

const Custom404 = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>ページが見つかりません</title>
      </Head>
      <Grid container justifyContent="center">
        <Grid item>
          <Image src="/images/404.png" width={400} height={320} alt="404" />
        </Grid>
      </Grid>
    </>
  );
};

export default Custom404;
