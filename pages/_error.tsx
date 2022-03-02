import { Grid } from '@material-ui/core';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

const Custom500 = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>エラーが発生しました</title>
      </Head>
      <Grid container justifyContent="center">
        <Grid item>
          <Image src="/images/500.png" width={400} height={302} alt="500" />
        </Grid>
      </Grid>
    </>
  );
};

export default Custom500;
