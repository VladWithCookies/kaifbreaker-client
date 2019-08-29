import React from 'react'
import DateUtils from '@date-io/dayjs'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import useStyles from './styles'

export default function DateTimeInput({ label, name, value, onChange, onBlur }) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <MuiPickersUtilsProvider utils={DateUtils}>
        <DateTimePicker
          clearable
          disablePast
          name={name}
          label={label}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          className={classes.input}
          invalidDateMessage='Неправильный формат даты'
        />
      </MuiPickersUtilsProvider>
    </div>
  )
}
