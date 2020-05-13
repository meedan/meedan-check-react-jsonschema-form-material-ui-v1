import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { generate } from 'shortid';
import { StylesProvider, createGenerateClassName, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import formStyles from './form-styles';
import FormField from './FormField';
import updateFormData, { addListItem, removeListItem, moveListItem } from './helpers/update-form-data';
import getValidationResult from './helpers/validation';
import ValidationMessages from './ValidationMessages';
import FormButtons from './FormButtons';

class Form extends React.PureComponent {
  state = { id: generate() }
  onChange = field => (value) => {
    this.props.onChange(updateFormData(this.props.value, field, value));
  }
  onMoveItemUp = (path, idx) => () => {
    this.props.onChange(moveListItem(this.props.value, path, idx, -1));
  }
  onMoveItemDown = (path, idx) => () => {
    this.props.onChange(moveListItem(this.props.value, path, idx, 1));
  }
  onDeleteItem = (path, idx) => () => {
    this.props.onChange(removeListItem(this.props.value, path, idx));
  }
  onAddItem = (path, defaultValue) => () => {
    this.props.onChange(addListItem(this.props.value, path, defaultValue || ''));
  }
  onSubmit = () => {
    this.props.onSubmit();
  }
  render() {
    const { classes, schema, value, onSubmit, actionButtonPos, onChange, onCancel, submitValue, ...rest } = this.props;
    const { id } = this.state;
    const validation = getValidationResult(schema, value);

    return (
      <Paper className={classes.root}>
        {
          (actionButtonPos === 'top') ?
                <FormButtons onSubmit={this.onSubmit} submitValue={submitValue} onCancel={onCancel} classes={classes} />
                : null

        }
        <ValidationMessages validation={validation} />
        <FormField
          path={''}
          id={id}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          data={value}
          schema={schema}
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
    );
  }
}

const StyledForm = withStyles(formStyles)(Form);

function withJss(WrappedComponent) {
  const generateClassName = createGenerateClassName({ productionPrefix: 'meedan-rjfmu', seed: 'meedan-rjfmu' });
  const innerName = WrappedComponent.displayName || WrappedComponent.name || 'unknown';

  const inner = (props) => (
    <StylesProvider generateClassName={generateClassName}>
      <WrappedComponent {...props} />
    </StylesProvider>
  );
  inner.displayName = `withJss(${innerName})`;
  return inner;
}

export default withJss(StyledForm);
