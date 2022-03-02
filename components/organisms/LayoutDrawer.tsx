import { Divider, Drawer, Hidden, Toolbar } from '@material-ui/core';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { AddCircle, List, Notifications, Star, WbSunny, CalendarToday } from '@material-ui/icons';
import Router from 'next/router';
import React from 'react';

import MenuListItem, { MenuItem } from '../molecules/MenuListItem';

const drawerWidth = 240;
const viewMenu: Array<MenuItem> = [
  {
    icon: <WbSunny />,
    text: '今日',
    event: () => Router.push('/todayTodo'),
  },
  {
    icon: <Star />,
    text: '重要',
    event: () => Router.push('/importantTodo'),
  },
  {
    icon: <Notifications />,
    text: '期限間近',
    event: () => Router.push('/limitTodo'),
  },
  {
    icon: <CalendarToday />,
    text: 'カレンダー',
    event: () => Router.push('/todo/calendar'),
  },
  {
    icon: <List />,
    text: '全て',
    event: () => Router.push('/todo/list'),
  },
];
const addMenu: Array<MenuItem> = [
  {
    icon: <AddCircle />,
    text: 'TODO追加',
    event: () => Router.push('/addTodo'),
  },
  {
    icon: <AddCircle />,
    text: 'ジャンル追加',
    event: () => Router.push('/addGenre'),
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
  })
);

interface Props {
  window?: () => Window;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const LayoutDrawer = (props: Props): JSX.Element => {
  const { window, mobileOpen, handleDrawerToggle } = props;
  const classes = useStyles();
  const theme = useTheme();

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <MenuListItem menuItems={viewMenu} />
      <Divider />
      <MenuListItem menuItems={addMenu} />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden xsUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default LayoutDrawer;
