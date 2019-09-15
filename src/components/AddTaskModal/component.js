import React from 'react'
import { Field } from 'formik'
import { Dialog, Container, Button } from '@material-ui/core'

import TextField from '../Fields/TextField'
import AddItemButton from '../AddItemButton'
import useStyles from './styles'

export default function AddTaskModal({ isOpen, onOpen, onClose, handleSubmit }) {
  const classes = useStyles()

  return (
    <React.Fragment>
      <AddItemButton
        caption='Добавить задачу'
        onClick={onOpen}
      />
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
              id='content'
              name='content'
              label='Описание'
              component={TextField}
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
                Создать таску
              </Button>
            </div>
          </form>
        </Container>
      </Dialog>
    </React.Fragment>
  )
}
