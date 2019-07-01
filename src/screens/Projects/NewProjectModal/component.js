import React from 'react'
import { Dialog, Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'

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
        hi nigga
      </Dialog>
    </React.Fragment>
  )
}
