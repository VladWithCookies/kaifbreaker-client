import React from 'react'
import { Field } from 'formik'
import { Edit } from '@material-ui/icons'
import { IconButton, Dialog, Container, Button } from '@material-ui/core'

import TextField from '../Fields/TextField'
import ToggleField from '../Fields/ToggleField'

import useStyles from './styles'

export default function EditProjectModal({ isOpen, onClose, onOpen, handleSubmit }) {
  const classes = useStyles()

  return (
    <>
      <IconButton
        aria-label='Edit'
        onClick={onOpen}
        color="inherit"
      >
        <Edit />
      </IconButton>
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
            <Field
              id='public'
              name='public'
              label='Публичный'
              component={ToggleField}
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
                Обновить проект
              </Button>
            </div>
          </form>
        </Container>
      </Dialog>
    </>
  )
}
