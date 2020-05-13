import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import fieldStyles from './field-styles';

// for unit testing only
export class RawConfiguredField extends React.PureComponent {
  render() {
    const {
      classes = undefined, data, type, helpText, Component = Input, LabelComponent, labelComponentProps = {},
      title, className, componentProps = {}, id,
    } = this.props;
    return (
      <FormControl classes={classes}>
        {LabelComponent && title &&
          <LabelComponent
            {...labelComponentProps}
          >{title}
          </LabelComponent>
        }
        <Component
          className={className && classes[className]}
          value={data === undefined ? '' : data /* "" means, ensure it's a controlled component */}
          type={type}
          {...componentProps}
        />
        {helpText && <FormHelperText id={`${id}-help`}>{helpText}</FormHelperText>}
      </FormControl>
    );
  }
}
export default withStyles(fieldStyles)(RawConfiguredField);
