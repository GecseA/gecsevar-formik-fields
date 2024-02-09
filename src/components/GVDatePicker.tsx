import {FieldProps, getIn, useFormikContext} from "formik";
import {DatePicker} from "@mui/x-date-pickers";
import React from "react";

export function GVDatePicker({field, form: {errors, touched, isSubmitting}, ...props}: FieldProps) {

    const {setFieldValue} = useFormikContext();
    return <DatePicker value={field.value}
                       format={"yyyy-MM-dd"}
                       {...props}
                       slotProps={{ textField:{size:"small", sx:{width: '140px'}, helperText: getIn(errors, field.name) }}}
                       onChange={(value) => setFieldValue(field.name, value)}
                       disabled={isSubmitting}
    />
}