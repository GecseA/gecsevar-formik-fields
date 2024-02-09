import React from 'react'
import { getIn } from 'formik'
import Box from '@mui/material/Box'
import { TextFieldProps } from 'formik-mui'
import { TextField } from '@mui/material'

export function GVTextField({ field, form: { errors, touched, isSubmitting }, ...props }: TextFieldProps) {
  let errorMessage: any = undefined
  if (getIn(touched, field.name) === true) {
    errorMessage = getIn(errors, field.name)
  }
  return (
    <Box>
      <TextField
        style={{ maxWidth: '300px', margin: '5px' }}
        size={'small'}
        {...field}
        {...props}
        helperText={errorMessage}
        error={!!errorMessage}
        disabled={isSubmitting || props.disabled}
      />
    </Box>
  )
}
