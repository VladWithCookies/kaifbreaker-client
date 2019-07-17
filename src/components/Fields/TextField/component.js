import React from 'react'
import { TextField } from '@material-ui/core'

import useStyles from './styles'

export default function({
  id,
  type,
  label,
  field,
  multiline,
}) {
  const classes = useStyles()

  return (
    <TextField
      {...field}
      id={id}
      type={type}
      label={label}
      margin='normal'
      multiline={multiline}
      className={classes.input}
    />
  )
}
