import {FieldProps, getIn, useFormikContext} from "formik";
import {TimePicker} from "@mui/x-date-pickers";
import React from "react";

export function GVTimePicker({field, form: {errors, touched, isSubmitting}, ...props}: FieldProps) {

    const {setFieldValue} = useFormikContext();

    return <TimePicker ampm={false}
                       ampmInClock={false}
                       value={field.value}
                       {...props}
                       onChange={(value) => setFieldValue(field.name, value, true)}
                       disabled={isSubmitting}
                       slotProps={{
                           textField: {
                               size:"small", sx:{width: '120px', paddingRight: '5px'},
                               helperText: getIn(errors, field.name)
                           },
                       }}
    />
}