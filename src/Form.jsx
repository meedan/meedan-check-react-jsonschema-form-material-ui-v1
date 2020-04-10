import React from 'react';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import isEqual from 'lodash/isEqual';
import { generate } from 'shortid';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import { create } from 'jss'
import JssProvider from 'react-jss/lib/JssProvider';
import formStyles from './form-styles';
import FormField from './FormField';
import updateFormData, { addListItem, removeListItem, moveListItem } from './helpers/update-form-data';
import getValidationResult from './helpers/validation';
import ValidationMessages from './ValidationMessages';
import FormButtons from './FormButtons';

const jss = create();
jss.setup({ insertionPoint: 'custom-insertion-point' });

// snippet from https://github.com/marmelab/react-admin/issues/1782
const escapeRegex = /([[\].#*$><+~=|^:(),"'`\s])/g;
let classCounter = 0;

// Heavily inspired of Material UI:
// @see https://github.com/mui-org/material-ui/blob/9cf73828e523451de456ba3dbf2ab15f87cf8504/src/styles/createGenerateClassName.js
// The issue with the MUI function is that is create a new index for each
// new `withStyles`, so we handle have to write our own counter
export const generateClassName = (rule, styleSheet) => {
    classCounter += 1;

    if (process.env.NODE_ENV === 'production') {
        return `check-jss${classCounter}`;
    }

    if (styleSheet && styleSheet.options.classNamePrefix) {
        let prefix = styleSheet.options.classNamePrefix;
        // Sanitize the string as will be used to prefix the generated class name.
        prefix = prefix.replace(escapeRegex, '-');

        if (prefix.match(/^Mui/)) {
            return `${prefix}-${rule.key}`;
        }

        return `${prefix}-${rule.key}-${classCounter}`;
    }

    return `${rule.key}-${classCounter}`;
};

class Form extends React.Component {
  state = {
    data: this.props.formData,
    validation: getValidationResult(this.props.schema, this.props.formData),
    id: generate(),
  }
  componentWillReceiveProps = (nextProps) => {
    let validation;
    if (!isEqual(nextProps.schema, this.props.schema)) {
      validation = {};
    }
    else {
      validation = getValidationResult(this.props.schema, nextProps.formData);
    }
    this.setState({
      validation,
      data: nextProps.formData,
    });
  }
  onChange = field => (value) => {
    const data = updateFormData(this.state.data, field, value);
    this.setState({
      data,
      validation: getValidationResult(this.props.schema, data),
    }, this.notifyChange);
  }
  onMoveItemUp = (path, idx) => () => {
    this.setState({ data: moveListItem(this.state.data, path, idx, -1) }, this.notifyChange);
  }
  onMoveItemDown = (path, idx) => () => {
    this.setState({ data: moveListItem(this.state.data, path, idx, 1) }, this.notifyChange);
  }
  onDeleteItem = (path, idx) => () => {
    this.setState({ data: removeListItem(this.state.data, path, idx) }, this.notifyChange);
  }
  onAddItem = (path, defaultValue) => () => {
    this.setState({ data: addListItem(this.state.data, path, defaultValue || '') }, this.notifyChange);
  }
  onSubmit = () => {
    this.props.onSubmit({ formData: this.state.data });
  }
  notifyChange = () => {
    const { onChange } = this.props;
    const { data } = this.state;
    if (onChange) {
      onChange({ formData: data });
    }
  }
  render() {
    const { classes, formData, onSubmit, actionButtonPos, onChange, onCancel, submitValue, ...rest } = this.props;
    const { validation, id } = this.state;

    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Paper className={classes.root}>
            {
              (actionButtonPos === 'top') ?
                    <FormButtons onSubmit={this.onSubmit} submitValue={submitValue} onCancel={onCancel} classes={classes} />
                    : null

            }
            <ValidationMessages validation={validation} />
            <FormField
              path={''}
              data={this.state.data}
              id={id}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              validation={validation}
              onMoveItemUp={this.onMoveItemUp}
              onMoveItemDown={this.onMoveItemDown}
              onDeleteItem={this.onDeleteItem}
              onAddItem={this.onAddItem}
              {...rest}
            />
            {
              (!actionButtonPos) ?
                    <FormButtons onSubmit={this.onSubmit} submitValue={submitValue} onCancel={onCancel} classes={classes} />
                    : null

            }
          </Paper>
        </MuiPickersUtilsProvider>
      </JssProvider>
    );
  }
}

export default withStyles(formStyles)(Form);
