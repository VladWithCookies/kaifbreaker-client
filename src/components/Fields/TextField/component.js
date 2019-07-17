import React from 'react'
import { FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core'

import useStyles from './styles'

export default function({
  id,
  type,
  label,
  field,
  error,
  isError,
  multiline,
}) {
  const classes = useStyles()

  return (
    <FormControl
      margin='normal'
      className={classes.input}
      error={isError}
    >
      <InputLabel htmlFor={id}>
        {label}
      </InputLabel>
      <Input
        {...field}
        id={id}
        type={type}
        multiline={multiline}
      />
      {isError && (
        <FormHelperText>
          {error}
        </FormHelperText>
      )}
    </FormControl>
  )
}
