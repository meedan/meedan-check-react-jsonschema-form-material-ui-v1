import React from 'react';
import classNames from 'classnames';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript'; // eslint-disable-line
import Valid from '@material-ui/icons/CheckCircle';
import Invalid from '@material-ui/icons/HighlightOff';
import { withStyles } from '@material-ui/core/styles';
import sourceStyles from './editor-styles';

const cmOptions = {
  // mode: { name: 'javascript', json: true },
  // theme: 'material',
  smartIndent: true,
  lineNumbers: true,
  lineWrapping: true,
  readOnly: false,
};

const isValid = (value) => {
  try {
    JSON.parse(value);
    return true;
  }
  catch (e) {
    return false;
  }
};

class Source extends React.PureComponent {
  state = { buggySource: null }

  onBeforeChange = (editor, data, value) => {
    // call onChange(newValue) if we can
    let onChange, newValue;
    try {
      newValue = JSON.parse(value);
      onChange = this.props.onChange;
    } catch (err) {
      // can't call onChange().
      this.setState({ buggySource: value });
      return;
    }

    this.setState({ buggySource: null });
    if (onChange) {
      // Call it outside the try/catch block, so any errors aren't caught
      onChange(newValue);
    }
  }

  getSource() {
    if (this.state.buggySource !== null) {
      return this.state.buggySource;
    }
    return JSON.stringify(this.props.source, null, 2);
  }

  render() {
    const { classes, title } = this.props;
    const valid = this.state.buggySource === null;
    const Icon = valid ? Valid : Invalid;
    return (
      <div className={classes.root}>
        <div className={classNames(classes.ctr, { [classes.invalid]: !valid })}>
          <div>
            <Icon className={classes.icon} />
            <div className={classes.title}>
              <p>{title}</p>
            </div>
          </div>
          <div className={classes.source}>
            <CodeMirror
              value={this.getSource()}
              onBeforeChange={this.onBeforeChange}
              options={cmOptions}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(sourceStyles)(Source);
