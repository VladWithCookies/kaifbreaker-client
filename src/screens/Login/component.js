import React from 'react'
import { Field } from 'formik'
import { Container, Button, FormHelperText } from '@material-ui/core'

import TextField from '../../components/Fields/TextField'
import useStyles from './styles'

function Login({ handleSubmit, errors }) {
  const classes = useStyles()

  return (
    <Container className={classes.container}>
      <form onSubmit={handleSubmit}>
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
        {errors.api && (
          <FormHelperText error>
            {errors.api}
          </FormHelperText>
        )}
        <Button
          type='submit'
          color='primary'
          variant='contained'
          className={classes.button}
        >
          ВОЙТИ
        </Button>
      </form>
    </Container>
  )
}

export default Login
