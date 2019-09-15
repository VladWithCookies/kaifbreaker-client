import React from 'react'
import { ArrowBack } from '@material-ui/icons'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'

export default function BackNavigation({ title, history }) {
  return (
    <AppBar position='fixed'>
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='Back'
          onClick={history.goBack}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant='h6'>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
