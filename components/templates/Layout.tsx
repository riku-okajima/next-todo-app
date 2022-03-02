import { createStyles, makeStyles, Theme, Toolbar } from '@material-ui/core';
import Head from 'next/head';
import React, { Fragment, ReactNode, useState } from 'react';

import LayoutAppBar from '../organisms/LayoutAppBar';
import LayoutDrawer from '../organisms/LayoutDrawer';

interface Props {
  children?: ReactNode;
  title?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const Layout = ({ children, title = 'This is the default title' }: Props): JSX.Element => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={classes.root}>
        <LayoutAppBar handleDrawerToggle={handleDrawerToggle} />
        <LayoutDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <main className={classes.content}>
          <Toolbar />
          {children}
        </main>
      </div>
    </Fragment>
  );
};

export default Layout;
