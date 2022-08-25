import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import examples from '../examples';

import menuStyles from './menu-styles';

const MenuItems = ({ closeDrawer, classes, onSelectMenuItem }) => (
  <div
    tabIndex={0}
    role='button'
    onClick={closeDrawer}
    onKeyDown={closeDrawer}
    className={classes.drawerList}
  >
    <List subheader={<ListSubheader component='div'>Showcase</ListSubheader>}>
      {Object.keys(examples).map(e => (
        <ListItem key={e} button>
          <ListItemText primary={examples[e].title} onClick={() => { onSelectMenuItem(examples[e]); closeDrawer(); }} />
        </ListItem>
      ))}
    </List>
  </div>
);

export default withStyles(menuStyles)(MenuItems);
