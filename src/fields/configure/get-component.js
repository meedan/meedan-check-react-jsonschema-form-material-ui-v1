import Input from '@material-ui/core/Input';
import { RadioGroup, Select, Checkbox, DatePicker, DatetimePicker, TimePicker } from '../components';

export default ({ schema, uiSchema = {} }) => {
  // console.log('getComponent schema: %o, uiSchema: %o', schema, uiSchema);
  const widget = uiSchema['ui:widget'];
  const { type } = schema;

  if (schema.enum) {
    switch (widget) {
      case 'radio': return RadioGroup;
      case 'checkboxes': return Checkbox;
      default: return Select;
    }
  }
  switch (type) {
    case 'boolean': return Checkbox;
    case 'material-date': return DatePicker;
    case 'material-time': return TimePicker;
    case 'material-datetime': return DatetimePicker;
    default: return Input;
  }
};
