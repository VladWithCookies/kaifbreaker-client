import React from 'react'
import { FormControlLabel, Switch } from '@material-ui/core'

export default function({ field, label }) {
  return (
    <FormControlLabel
      label={label}
      control={
        <Switch
          {...field}
          checked={field.value}
        />
      }
    />
  )
}
