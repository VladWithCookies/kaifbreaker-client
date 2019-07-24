import React from 'react'

import TextFieldComponent from './component'

function TextField({ form, field, ...rest }) {
  const { errors, touched } = form
  const { name } = field

  const error = errors[name]
  const isError = touched[name] && !!error

  return (
    <TextFieldComponent
      {...rest}
      field={field}
      error={error}
      isError={isError}
    />
  )
}

export default TextField
