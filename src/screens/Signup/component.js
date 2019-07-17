import React from 'react'
import { Field } from 'formik'
import { Container, Button } from '@material-ui/core'

import TextField from '../../components/Fields/TextField'
import useStyles from './styles'

export default function Signup({ handleSubmit }) {
  const classes = useStyles()

  return (
    <Container className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Field
          id='firstName'
          name='lastName'
          label='Имя'
          component={TextField}
        />
        <Field
          id='lastName'
          name='lastName'
          label='Фамилия'
          component={TextField}
        />
        <Field
          id='email'
          name='email'
          label='Емейл'
          component={TextField}
        />
        <Field
          id='password'
          name='password'
          type='password'
          label='Пароль'
          component={TextField}
        />
        <Button
          type='submit'
          color='primary'
          variant='contained'
          className={classes.button}
        >
          СОЗДАТЬ АККАУНТ
        </Button>
      </form>
    </Container>
  )
}
