import React from 'react'
import { Add } from '@material-ui/icons'
import { Dialog, Fab, TextField, Container, Button, FormControlLabel, Switch } from '@material-ui/core'

import DateTime from '../../../components/Inputs/DateTime'
import useStyles from './styles'

export default function({ isOpen, onOpen, onClose }) {
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
          <form className={classes.form}>
            <TextField
              id='title'
              label='Название'
              margin='normal'
              className={classes.input}
            />
            <TextField
              id='description'
              label='Описание'
              margin='normal'
              className={classes.input}
              multiline
            />
            <DateTime className={classes.input} />
            <FormControlLabel
              control={<Switch />}
              label='Публичный'
            />
            <div className={classes.actions}>
              <Button variant='outlined'>
                Не, не надо
              </Button>
              <Button variant='outlined' color='secondary'>
                Создать список
              </Button>
            </div>
          </form>
        </Container>
      </Dialog>
    </React.Fragment>
  )
}
