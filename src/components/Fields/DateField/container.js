import React from 'react'

import DateFieldComponent from './component'

function TextField({
  form: { setFieldValue },
  field: { name, value, onBlur }
}) {
  const convertedValue = value || new Date()

  const handleChange = (date) => {
    setFieldValue(name, date.toString())
  }

  return (
    <DateFieldComponent
      name={name}
      onBlur={onBlur}
      value={convertedValue}
      onChange={handleChange}
    />
  )
}

export default TextField
