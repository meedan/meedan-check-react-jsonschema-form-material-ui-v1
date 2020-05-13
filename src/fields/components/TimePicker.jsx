import React from 'react';
import { TimePicker as MuiTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

/*
 * Beware workarounds involving bugs in material-ui-pickers' design.
 *
 * See https://github.com/mui-org/material-ui-pickers/issues/1358#issuecomment-628015527
 *
 * @material-ui/pickers operate on a Date, but we really want a String.
 * These funky DateUtils let @material-ui/pickers pick dates in the local
 * timezone ... but they ensure outside callers only see ISO8601 Strings.
 */

class HackyDateUtils extends DateFnsUtils {
    format(value, formatString) {
        if (formatString === "hacky-display") {
            // "12:31:00 AM" => "12:31 AM"
            return value.toLocaleTimeString().replace(/(\d+:\d+):00/, '$1');
        }
        return super.format(value, formatString);
    }
}

/**
 * Convert a _local-time_ value to an ISO-8601 Time string.
 *
 * For instance: given 2020-05-13T03:59:50.000Z, if we're in UTC-4,
 * return "23:59:50".
 *
 * Why? Because material-ui selects times as local-time (not UTC) Date.
 * If we ran date.toISOString(), that would convert to UTC and then
 * convert to String; but if we convert to UTC, that changes the date.
 */
function jsDateToLocalISO8601DateString(date) {
    return [
        String(100 + date.getHours()).substring(1),
        String(100 + date.getMinutes()).substring(1),
    ].join(':');
}

function timeStringToLocalDate(s) {
    if (!s) return null;
    const timestamp = Date.parse(`2000-01-01 ${s}`); // may be NaN
    return new Date(timestamp); // NaN gives "Invalid Date"
}

export default function TimePicker({ label, value, onChange }) {
    const handleChange = React.useCallback(date => {
        onChange({ target: { value: date ? jsDateToLocalISO8601DateString(date) : null } });
    }, [onChange]);

    return (
        <MuiPickersUtilsProvider utils={HackyDateUtils}>
            <MuiTimePicker
                label={label}
                format="hacky-display"
                key={value /* if value prop changes, reset MuiDatePicker state */}
                value={timeStringToLocalDate(value)}
                onChange={handleChange}
            />
        </MuiPickersUtilsProvider>
    );
}
