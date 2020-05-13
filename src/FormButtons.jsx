import React from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

export default function RawFormButtons({ classes, onCancel, onSubmit, submitValue }) {
  return (onCancel || onSubmit) && (
    <div className={classes.formButtons}>
      {onCancel &&
        <Button
          className={classNames(classes.cancel, classes.button)}
          variant="text"
          onClick={onCancel}
        >
          Cancel
        </Button>
      }
      {onSubmit &&
        <Button
          className={classNames(classes.submit, classes.button)}
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          { submitValue || 'Submit'}
        </Button>
      }
    </div>
  );
}
