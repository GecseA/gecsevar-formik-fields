import { getIn } from 'formik'
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  useTheme,
} from '@mui/material'
import { TextFieldProps } from 'formik-mui'
import CancelIcon from '@mui/icons-material/Cancel'
import React from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  }
}

interface GVSelectFieldProps extends TextFieldProps {
  isMultiSelect: boolean
  options: string[]
}

export function GVSelect({
  field,
  isMultiSelect = false,
  options,
  form: { errors, touched, isSubmitting, values, setFieldValue },
  ...props
}: GVSelectFieldProps) {
  let errorMessage: any = undefined
  if (getIn(touched, field.name) === true) {
    errorMessage = getIn(errors, field.name)
  }

  const theme = useTheme()
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event
    setFieldValue(field.name, typeof value === 'string' ? value.split(',') : value)
  }

  return isMultiSelect ? (
    <FormControl sx={{ margin: '5px', width: 300 }}>
      <InputLabel id='demo-multiple-chip-label'>{props.label}</InputLabel>
      <Select
        labelId='demo-multiple-chip-label'
        id='gv-select-chip'
        multiple
        size={'small'}
        value={getIn(values, field.name)}
        onChange={handleChange}
        input={<OutlinedInput id='select-multiple-chip' label={props.label} />}
        renderValue={(selected: string[]) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((val) => (
              <Chip
                key={val}
                label={val}
                size={'small'}
                onDelete={() => {
                  const temp: Array<string> = getIn(values, field.name).filter((item: string) => {
                    return item !== val
                  })
                  setFieldValue(field.name, temp)
                }}
                deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {options.map((name) => (
          <MenuItem key={name} value={name} style={getStyles(name, options, theme)}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : (
    <TextField
      style={{ minWidth: '200px', maxWidth: '300px', margin: '5px' }}
      {...field}
      {...props}
      size={'small'}
      select
      helperText={errorMessage}
      error={!!errorMessage}
      disabled={isSubmitting || props.disabled}
    ></TextField>
  )
}
