import React from 'react'
import { ArrowBack } from '@material-ui/icons'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'

import EditProjectModal from '../../../components/EditProjectModal'
import useStyles from './styles'

export default function Navigation({ title, onClick }) {
  const classes = useStyles()

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='Back'
          onClick={onClick}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant='h6'>
          {title}
        </Typography>
        <div className={classes.grow} />
        <EditProjectModal />
      </Toolbar>
    </AppBar>
  )
}
