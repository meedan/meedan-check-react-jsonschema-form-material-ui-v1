import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from './menu';
import Body from './body';
import './main.scss'; // eslint-disable-line import/no-unresolved,import/no-extraneous-dependencies
import examples from './examples';

class DemoHome extends React.Component {
  state = {
    selectedDemo: examples.simple,
  }
  onSelectMenuItem = (type) => {
    this.setState({ selectedDemo: type });
  }
  render() {
    return (
      <div>
        <Menu onSelectMenuItem={this.onSelectMenuItem} />
        <Body selectedDemo={this.state.selectedDemo} />
      </div>
    );
  }
}

export default DemoHome;
