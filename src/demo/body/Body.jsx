import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './body-styles';
import Example from './Example';

const Body = ({ selectedDemo, classes }) => (
  <div className={classes.body}>
    <Example key={selectedDemo.title} data={selectedDemo} />
  </div>
);

export default withStyles(styles)(Body);
