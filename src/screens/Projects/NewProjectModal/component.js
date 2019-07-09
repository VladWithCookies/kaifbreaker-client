import React from 'react'
import { Field } from 'formik'
import { Add } from '@material-ui/icons'
import { Dialog, Fab, Container, Button, FormControlLabel, Switch } from '@material-ui/core'

import DateTime from '../../../components/Inputs/DateTime'
import TextField from '../../../components/Fields/TextField'
import useStyles from './styles'

export default function({ isOpen, onOpen, onClose, handleSubmit, values }) {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Fab
        color='primary'
        aria-label='Add'
        className={classes.fab}
        onClick={onOpen}
      >
        <Add />
      </Fab>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={onClose}
        className={classes.dialog}
      >
        <Container className={classes.formContainer}>
          <form
            onSubmit={handleSubmit}
            className={classes.form}
          >
            <Field
              id='title'
              name='title'
              label='Название'
              component={TextField}
            />
            <Field
              id='description'
              name='description'
              label='Описание'
              component={TextField}
              multiline
            />
            <DateTime />
            <FormControlLabel
              control={<Switch />}
              label='Публичный'
            />
            <div className={classes.actions}>
              <Button
                variant='outlined'
                onClick={onClose}
              >
                Не, не надо
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                type='submit'
              >
                Создать список
              </Button>
            </div>
          </form>
        </Container>
      </Dialog>
    </React.Fragment>
  )
}
