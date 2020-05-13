import React from 'react';
import { DateTimePicker as MuiDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

class HackyDateUtils extends DateFnsUtils {
    format(value, formatString) {
        if (formatString === "hacky-display") {
            // "12:31:00 AM" => "12:31 AM"
            return value.toLocaleString().replace(/(\d+:\d+):00/, '$1');
        }
        return super.format(value, formatString);
    }
}

function datetimeStringToLocalDate(s) {
    if (!s) return null;
    const timestamp = Date.parse(s); // may be NaN
    return new Date(timestamp); // NaN gives "Invalid Date"
}

export default function DatetimePicker({ label, value, onChange }) {
    const handleChange = React.useCallback(date => {
        onChange({ target: { value: date ? date.toISOString() : null } });
    }, [onChange]);

    return (
        <MuiPickersUtilsProvider utils={HackyDateUtils}>
            <MuiDateTimePicker
                label={label}
                key={value /* if value prop changes, reset MuiDatePicker state */}
                value={datetimeStringToLocalDate(value)}
                format="hacky-display"
                mask={[] /* mask is incompatible with hacky-display */}
                onChange={handleChange}
            />
        </MuiPickersUtilsProvider>
    );
};
