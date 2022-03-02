import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';

interface Props {
  menuItems: Array<MenuItem>;
}

export interface MenuItem {
  icon: React.ReactNode;
  text: string;
  event?: () => void;
}

const MenuListItem = (props: Props): JSX.Element => {
  const { menuItems } = props;

  return (
    <List>
      {menuItems.map(({ icon, text, event }) => (
        <ListItem button key={text} onClick={event}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );
};

export default MenuListItem;
