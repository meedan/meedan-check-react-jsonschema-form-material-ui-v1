import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import MenuItems from './MenuItems';
import menuStyles from './menu-styles';

const LeftDrawer = ({ classes, open, closeDrawer, onSelectMenuItem }) => (
  <div>
    <Hidden only={['xs', 'sm', 'md']}>
      <Drawer variant={'permanent'} className={classes.permanentLeftDrawer}>
        <MenuItems closeDrawer={closeDrawer} onSelectMenuItem={onSelectMenuItem} />
      </Drawer>
    </Hidden>
    <Hidden only={['lg', 'xl']}>
      <Drawer open={open} className={classes.leftDrawer} onClose={closeDrawer}>
        <MenuItems closeDrawer={closeDrawer} onSelectMenuItem={onSelectMenuItem} />
      </Drawer>
    </Hidden>
  </div>
);

export default withStyles(menuStyles)(LeftDrawer);
