import React from "react";
import {getIn} from "formik";
import Box from "@mui/material/Box";
import {CheckboxProps} from "formik-mui";
import {Checkbox, FormControlLabel} from "@mui/material";

interface GVCheckboxProps extends CheckboxProps {
    label: string
}

export function GVCheckbox({field, form: {errors, touched, isSubmitting, values, handleChange, setFieldValue}, ...props}: GVCheckboxProps) {

    let errorMessage: any = undefined
    if (getIn(touched, field.name) === true) {
        errorMessage = getIn(errors, field.name)
    }

    return <Box display="flex" sx={{margin: "5px", alignItems: 'center' }}>
        <FormControlLabel label={props.label} control={
            <Checkbox
                id={field.name}
                name={field.name}
                checked={typeof getIn(values, field.name) === "string" ?
                    getIn(values, field.name) === "1" ? true : false
                    :
                    getIn(values, field.name)
                }
                onChange={(val) => {
                    setFieldValue(field.name, val.target.checked)
                }}
            />
        }/>
    </Box>
}
